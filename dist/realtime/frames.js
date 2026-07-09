"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeClientFrame = encodeClientFrame;
exports.decodeServerFrame = decodeServerFrame;
const protobufjs_1 = __importDefault(require("protobufjs"));
const PROTO_SCHEMA = `
syntax = "proto3";
package chatto.realtime.v1;

message RealtimeClientFrame {
  oneof payload {
    RealtimeClientHello hello = 1;
    RealtimeSubscribeEvents subscribe_events = 2;
    RealtimePing ping = 3;
  }
}
message RealtimeClientHello { string bearer_token = 1; }
message RealtimeSubscribeEvents {}
message RealtimePing { string nonce = 1; }

message RealtimeServerFrame {
  oneof payload {
    RealtimeServerHello hello = 1;
    RealtimeSubscribed subscribed = 2;
    RealtimeEventEnvelope event = 3;
    RealtimeHeartbeat heartbeat = 4;
    RealtimePong pong = 5;
    RealtimeError error = 6;
    RealtimeClose close = 7;
  }
}
message RealtimeServerHello { int32 heartbeat_interval_seconds = 1; }
message RealtimeSubscribed {}
message RealtimeEventEnvelope {
  string id = 1;
  string created_at = 2;
  string actor_id = 3;
  oneof event {
    RealtimeMessagePostedEvent message_posted = 4;
    RealtimeMessageEditedEvent message_edited = 5;
    RealtimeMessageRetractedEvent message_retracted = 6;
    RealtimeReactionAddedEvent reaction_added = 7;
    RealtimeReactionRemovedEvent reaction_removed = 8;
  }
}
message RealtimeMessagePostedEvent { string room_id = 1; string message_event_id = 2; }
message RealtimeMessageEditedEvent { string room_id = 1; string message_event_id = 2; }
message RealtimeMessageRetractedEvent { string room_id = 1; string message_event_id = 2; }
message RealtimeReactionAddedEvent {
  string room_id = 1; string message_event_id = 2;
  string emoji = 3; string actor_id = 4;
}
message RealtimeReactionRemovedEvent {
  string room_id = 1; string message_event_id = 2;
  string emoji = 3; string actor_id = 4;
}
message RealtimeHeartbeat {}
message RealtimePong { string nonce = 1; }
message RealtimeError { bool fatal = 1; string message = 2; }
message RealtimeClose { bool reconnect = 1; int32 retry_after_ms = 2; string message = 3; }
`;
let _root = null;
function getRoot() {
    if (_root == null) {
        _root = protobufjs_1.default.parse(PROTO_SCHEMA, { keepCase: true }).root;
    }
    return _root;
}
function encodeClientFrame(frame) {
    const ClientFrame = getRoot().lookupType('chatto.realtime.v1.RealtimeClientFrame');
    return Buffer.from(ClientFrame.encode(ClientFrame.create(frame)).finish());
}
function decodeServerFrame(buffer) {
    const ServerFrame = getRoot().lookupType('chatto.realtime.v1.RealtimeServerFrame');
    const decoded = ServerFrame.decode(buffer);
    return ServerFrame.toObject(decoded, { keepCase: true });
}
//# sourceMappingURL=frames.js.map