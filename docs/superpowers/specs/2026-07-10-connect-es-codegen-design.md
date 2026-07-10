# Generated Connect-ES clients for Chatto.ts

- **Date:** 2026-07-10
- **Status:** Approved (design)
- **Author:** Jasper (with Claude)

## Problem

The SDK talks to Chatto's ConnectRPC API through hand-written plumbing:

- `src/rest/client.ts` exposes a single generic `post(service, method, input, zodSchema)`
  that builds `POST {baseUrl}/api/connect/{service}/{method}` with the Connect JSON
  protocol.
- Every method is hand-coded in the managers with the service/method names as string
  literals (e.g. `'chatto.api.v1.MessageService'` / `'CreateMessage'`).
- Every request/response shape is a hand-written Zod schema in `src/schemas/` that
  mirrors the server's protobuf messages.

The Chatto server publishes its `.proto` files publicly (`chattocorp/chatto`, under
`proto/`, a buf v2 module). We can generate fully-typed Connect clients from those
protos instead of maintaining the plumbing and schemas by hand. This removes an entire
class of drift bugs (string typos, schema/field mismatches) and gives static types
straight from the source of truth.

Reflection is not used or needed: reflection exposes descriptors at runtime, but typed
TypeScript methods come from a build-time codegen step. We vendor the `.proto` files and
codegen from them.

## Goals

- Replace the hand-written Connect transport (`RestClient`) and the hand-written
  request/response Zod schemas with generated, statically-typed Connect-ES clients.
- Keep the existing Discord.js-like ergonomic surface unchanged: `ChattoClient.login`,
  `client.on(...)`, `message.reply/edit`, `client.users/rooms/messages` managers, and
  resource classes (`Message`/`User`/`Room`).
- Keep the existing `bun test` / `typecheck` / `build` and CI green with no new required
  build step (generated code is committed).

## Non-goals (explicitly out of scope)

- **Realtime WebSocket frames** (`src/realtime/frames.ts`) stay on the hand-written
  inline `.proto` string parsed by `protobufjs`. Scope is "transport only." Migrating
  realtime to generated types is a possible later follow-up.
- **Login** (`src/auth/integrated.ts`) stays as-is: it hits a plain REST endpoint
  `POST {baseUrl}/auth/login`, not a Connect RPC, so it is not part of codegen.
- No changes to the public API ergonomics or exported surface.

## Decisions (from brainstorming)

- **Schema source:** committed `.proto` files (deterministic, offline builds).
- **Bootstrap:** copy the protos from the `chattocorp/chatto` source repo.
- **Scope:** transport only — generated clients used *under* the existing ergonomic layer.
- **Generated code:** committed to the repo (see rationale below).

## Design

### 1. Vendored protos & codegen toolchain

Vendor a local buf module under `proto/`:

- Copy from `chattocorp/chatto` (`main`, path `proto/`) the files needed for the API
  services this SDK uses, plus their transitive imports. Known needed roots:
  `chatto/api/v1/messages.proto`, `chatto/api/v1/users.proto`,
  `chatto/api/v1/rooms.proto`, and/or `chatto/api/v1/room_directory.proto`
  (the current code calls `RoomDirectoryService`; confirm the exact service/file during
  implementation). Transitive imports observed include `chatto/api/v1/common.proto`,
  `chatto/api/v1/message_types.proto`, `chatto/api/v1/reactions.proto`,
  `chatto/api/v1/link_previews.proto`, `chatto/api/v1/pagination.proto`.
  During implementation, let `buf build` resolve the exact closure rather than guessing;
  vendor exactly what the closure requires. Preserve original package paths verbatim.
- Vendor `buf.yaml` and `buf.lock` so the `buf.build/bufbuild/protovalidate` dependency
  (`buf/validate/validate.proto`) resolves. protovalidate annotations are field options
  only and do not affect Protobuf-ES message generation.
- Add `buf.gen.yaml` targeting the Protobuf-ES v2 / Connect-ES v2 stack.

Toolchain:

- **Runtime deps (added):** `@bufbuild/protobuf` (message runtime),
  `@connectrpc/connect` (client), `@connectrpc/connect-web` (fetch-based transport;
  works on Bun and Node >=18 via global `fetch`).
- **Dev deps (added):** `@bufbuild/buf` (buf CLI), `@bufbuild/protoc-gen-es`.
  Protobuf-ES v2's `protoc-gen-es` emits both message types and service descriptors, so
  no separate connect codegen plugin is required.
- **New npm script:** `"generate": "buf generate"`. Run manually only when protos change.

Generated output lands in `src/gen/` and is **committed**.

Rationale for committing generated code: the existing CI (`.github/workflows/publish.yml`)
runs `typecheck` → `test` → `build` with no proto toolchain, and `prepublishOnly` is just
`tsc`. Committing the generated `.ts` keeps all of those working with zero new required
steps and makes builds deterministic without network access to BSR. `buf` is only needed
by a maintainer running `bun run generate` after a proto bump.

### 2. Transport & wiring

- `ChattoContext` builds one Connect transport from `baseUrl`, pointed at the same URL
  shape used today (`{baseUrl}/api/connect`), via
  `createConnectTransport({ baseUrl, ... })`.
- An **auth interceptor** injects `Authorization: Bearer <token>` on every request.
  Connect-Web sets `Connect-Protocol-Version` automatically, so it is no longer set by
  hand.
- Typed service clients are created once on the context via
  `createClient(Service, transport)` (one per service used).
- `src/rest/client.ts` (`RestClient`) is removed. `ClientContext` no longer exposes
  `rest`; it exposes the typed clients (or thin manager-facing accessors).

### 3. Error handling

- Connect errors surface as `ConnectError` from `@connectrpc/connect`. A thin wrapper
  (either in the interceptor or a small helper the managers funnel through) maps these to
  the existing `ChattoApiError(code, message, raw)` so thrown error types and shapes seen
  by SDK consumers are unchanged.
- `ChattoParseError` (previously thrown on Zod parse failure) is no longer produced for
  Connect responses, because decoding is handled by generated code against a typed schema.
  `ChattoParseError` remains for any non-Connect paths that still use Zod (e.g. login).

### 4. Managers, resources, hydration

- Rewrite the three managers to call generated clients:
  - `MessageManager` → `messageClient.createMessage(...)`, `messageClient.getMessage(...)`
    (map to the actual generated method names; confirm exact RPC names against the proto).
  - `UserManager` → `userClient.getUser/batchGetUsers/listUsers(...)`.
  - `RoomManager` → the room directory client's `listRooms/getRoom(...)`.
- Delete the hand-written response/request Zod schemas that only mirrored Connect
  messages: `src/schemas/message.ts`, `src/schemas/user.ts`, `src/schemas/room.ts`.
  Keep `src/schemas/realtime.ts` (realtime is out of scope).
- Adapt hydration (`ChattoContext.hydrateMessage`) and the resource constructors
  (`Message`, `User`, `Room`) to consume generated message types instead of the current
  plain objects / `MessageData` type in `src/types.ts`.

**Known behavioral watch-item — proto3 scalar defaults.** Protobuf-ES v2 represents
proto3 scalar fields with their zero value (`""`, `0`, `false`) rather than `undefined`.
The current resources treat fields like `body`, `updatedAt`, `inReplyTo`,
`threadRootEventId` as optional (`undefined` when absent). A small, explicit mapping shim
converts generated messages into the resource-facing shape, turning empty scalars back
into `undefined` where the current API contract expects it, so observable behavior of the
resource objects is unchanged. Fields marked `optional` in the proto already come through
as `undefined`, so the shim only needs to handle non-`optional` scalars that the current
code treats as optional.

## Testing

- The existing `bun test` suite must stay green. Manager/resource tests that currently
  drive `RestClient` are updated to drive the generated clients through a mocked transport
  (e.g. `createRouterTransport` from `@connectrpc/connect` or a stub transport), asserting
  the same request inputs and hydrated outputs as today.
- Generated code is committed, so tests need no proto toolchain to run.
- `typecheck` (`tsc --noEmit`) covers the generated code and the rewired managers.

## Risks & mitigations

- **Exact service/method/file names** (e.g. `RoomDirectoryService` vs `RoomService`,
  request field names) must match the vendored proto. Mitigation: derive them from the
  vendored `.proto` during implementation; do not hardcode from memory.
- **BSR dependency at codegen time** (`protovalidate`). Mitigation: committed generated
  output means SDK build/test never touch BSR; only `bun run generate` does.
- **proto3 scalar-default drift** (above). Mitigation: explicit mapping shim + tests
  asserting the current optional/undefined behavior.
- **Transport URL/auth parity.** Mitigation: point transport at `{baseUrl}/api/connect`
  and verify the interceptor reproduces today's `Authorization` header and error mapping.

## Rollout

Single change set (SDK is pre-1.0, `0.4.x`). Version bump handled by the normal
tag-driven publish flow. No consumer-facing API change intended, so no migration guide
required.
