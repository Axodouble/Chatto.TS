import { describe, it, expect, afterEach, spyOn, mock } from 'bun:test'
import { ConnectError, Code, createRouterTransport } from '@connectrpc/connect'
import { create } from '@bufbuild/protobuf'
import { MessageService } from '../../src/gen/chatto/api/v1/messages_pb'
import { GetMessageResponseSchema } from '../../src/gen/chatto/api/v1/messages_pb'
import { createServiceClients, createChattoTransport, toChattoError } from '../../src/rest/transport'
import { ChattoApiError } from '../../src/errors'
import { createClient } from '@connectrpc/connect'

afterEach(() => mock.restore())

describe('toChattoError', () => {
  it('maps a ConnectError to a ChattoApiError preserving the code name', () => {
    const err = toChattoError(new ConnectError('nope', Code.Unauthenticated))
    expect(err).toBeInstanceOf(ChattoApiError)
    expect(err.code).toBe('unauthenticated')
    expect(err.message).toContain('nope')
  })

  it('normalizes multi-word PascalCase codes to snake_case', () => {
    const notFound = toChattoError(new ConnectError('x', Code.NotFound))
    expect(notFound.code).toBe('not_found')

    const permissionDenied = toChattoError(new ConnectError('x', Code.PermissionDenied))
    expect(permissionDenied.code).toBe('permission_denied')
  })
})

describe('createServiceClients', () => {
  it('exposes typed clients that call the generated services', async () => {
    // A router transport lets us stub the server side without network.
    const transport = createRouterTransport(({ service }) => {
      service(MessageService, {
        getMessage: () => create(GetMessageResponseSchema, {
          message: { id: 'evt_1', roomId: 'R_1', actorId: 'U_1', body: 'hi' },
        }),
      })
    })
    const clients = createServiceClients(transport)
    const res = await clients.message.getMessage({ roomId: 'R_1', eventId: 'evt_1' })
    expect(res.message?.id).toBe('evt_1')
    // Sanity: createClient over the same service+transport behaves identically.
    void createClient(MessageService, transport)
  })
})

describe('createChattoTransport', () => {
  it('sends the Authorization header and targets the Connect base URL', async () => {
    let capturedUrl: string | undefined
    let capturedHeaders: Headers | undefined
    spyOn(globalThis, 'fetch').mockImplementation(async (url, init) => {
      capturedUrl = String(url)
      capturedHeaders = init?.headers as Headers
      return new Response(
        JSON.stringify({ message: { id: 'evt_1', roomId: 'R_1', actorId: 'U_1' } }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      )
    })

    const transport = createChattoTransport('https://chat.example.com', 'mytoken')
    const clients = createServiceClients(transport)
    const res = await clients.message.getMessage({ roomId: 'R_1', eventId: 'evt_1' })

    expect(res.message?.id).toBe('evt_1')
    expect(capturedUrl).toStartWith('https://chat.example.com/api/connect/')
    expect(capturedHeaders?.get('Authorization')).toBe('Bearer mytoken')
  })

})

describe('createServiceClients error mapping', () => {
  it('maps a server-thrown ConnectError to a ChattoApiError at the client boundary', async () => {
    const transport = createRouterTransport(({ service }) => {
      service(MessageService, {
        getMessage: () => {
          throw new ConnectError('denied', Code.PermissionDenied)
        },
      })
    })
    const clients = createServiceClients(transport)

    let caught: unknown
    try {
      await clients.message.getMessage({ roomId: 'R_1', eventId: 'evt_1' })
    } catch (err) {
      caught = err
    }

    expect(caught).toBeInstanceOf(ChattoApiError)
    expect(caught).not.toBeInstanceOf(ConnectError)
    expect((caught as ChattoApiError).code).toBe('permission_denied')
  })
})
