import protobuf from 'protobufjs'

const PROTO_SCHEMA = `
syntax = "proto3";
package chatto.realtime.v1;

message RealtimeClientFrame {
  oneof frame {
    RealtimeClientHello hello = 1;
    RealtimeSubscribeEvents subscribe_events = 2;
    RealtimePing ping = 3;
  }
}
message RealtimeClientHello {
  uint32 protocol_version = 1;
  optional string bearer_token = 2;
}
message RealtimeSubscribeEvents {}
message RealtimePing { string nonce = 1; }

message RealtimeServerFrame {
  oneof frame {
    RealtimeServerHello hello = 1;
    RealtimeSubscribed subscribed = 2;
    RealtimeEventEnvelope event = 3;
    RealtimeHeartbeat heartbeat = 4;
    RealtimeError error = 5;
    RealtimeClose close = 6;
    RealtimePong pong = 7;
  }
}
message RealtimeServerHello {
  uint32 protocol_version = 1;
  string server_version = 2;
  uint32 heartbeat_interval_seconds = 4;
  repeated string capabilities = 5;
}
message RealtimeSubscribed {}
message RealtimeHeartbeat { string id = 1; string created_at = 2; }
message RealtimePong { string nonce = 1; }
message RealtimeError { string code = 1; string message = 2; bool fatal = 3; }
message RealtimeClose { string code = 1; string message = 2; bool reconnect = 3; int32 retry_after_ms = 4; }

message RealtimeEventEnvelope {
  string id = 1;
  string created_at = 2;
  string actor_id = 3;
  oneof event {
    RealtimeMessagePostedEvent message_posted = 10;
    RealtimeMessageEditedEvent message_edited = 11;
    RealtimeMessageRetractedEvent message_retracted = 12;
    RealtimeReactionEvent reaction_added = 20;
    RealtimeReactionEvent reaction_removed = 21;
  }
}
message RealtimeMessagePostedEvent { string room_id = 1; string message_event_id = 2; string thread_root_event_id = 3; }
message RealtimeMessageEditedEvent { string room_id = 1; string message_event_id = 2; }
message RealtimeMessageRetractedEvent { string room_id = 1; string message_event_id = 2; string reason = 3; }
message RealtimeReactionEvent { string room_id = 1; string message_event_id = 2; string emoji = 3; }
`

let _root: protobuf.Root | null = null

function getRoot(): protobuf.Root {
  if (_root == null) {
    _root = protobuf.parse(PROTO_SCHEMA, { keepCase: true }).root
  }
  return _root
}

export interface EventEnvelopePayload {
  id: string
  created_at: string
  actor_id: string
  message_posted?: { room_id: string; message_event_id: string; thread_root_event_id?: string }
  message_edited?: { room_id: string; message_event_id: string }
  message_retracted?: { room_id: string; message_event_id: string; reason?: string }
  reaction_added?: { room_id: string; message_event_id: string; emoji: string }
  reaction_removed?: { room_id: string; message_event_id: string; emoji: string }
}

export interface ServerFrame {
  hello?: { protocol_version: number; server_version: string; heartbeat_interval_seconds: number; capabilities: string[] }
  subscribed?: Record<string, never>
  event?: EventEnvelopePayload
  heartbeat?: { id: string; created_at: string }
  pong?: { nonce: string }
  error?: { code: string; message: string; fatal: boolean }
  close?: { code: string; message: string; reconnect: boolean; retry_after_ms: number }
}

export type ClientFrame =
  | { hello: { protocol_version: number; bearer_token: string } }
  | { subscribe_events: Record<string, never> }
  | { ping: { nonce: string } }

export function encodeClientFrame(frame: ClientFrame): Buffer {
  const ClientFrame = getRoot().lookupType('chatto.realtime.v1.RealtimeClientFrame')
  return Buffer.from(ClientFrame.encode(ClientFrame.create(frame as object)).finish())
}

export function decodeServerFrame(buffer: Buffer): ServerFrame {
  const ServerFrame = getRoot().lookupType('chatto.realtime.v1.RealtimeServerFrame')
  const decoded = ServerFrame.decode(buffer)
  return ServerFrame.toObject(decoded, { keepCase: true } as object) as ServerFrame
}
