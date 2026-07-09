export interface EventEnvelopePayload {
    id: string;
    created_at: string;
    actor_id: string;
    message_posted?: {
        room_id: string;
        message_event_id: string;
        thread_root_event_id?: string;
    };
    message_edited?: {
        room_id: string;
        message_event_id: string;
    };
    message_retracted?: {
        room_id: string;
        message_event_id: string;
        reason?: string;
    };
    reaction_added?: {
        room_id: string;
        message_event_id: string;
        emoji: string;
    };
    reaction_removed?: {
        room_id: string;
        message_event_id: string;
        emoji: string;
    };
}
export interface ServerFrame {
    hello?: {
        protocol_version: number;
        server_version: string;
        heartbeat_interval_seconds: number;
        capabilities: string[];
    };
    subscribed?: Record<string, never>;
    event?: EventEnvelopePayload;
    heartbeat?: {
        id: string;
        created_at: string;
    };
    pong?: {
        nonce: string;
    };
    error?: {
        code: string;
        message: string;
        fatal: boolean;
    };
    close?: {
        code: string;
        message: string;
        reconnect: boolean;
        retry_after_ms: number;
    };
}
export type ClientFrame = {
    hello: {
        protocol_version: number;
        bearer_token: string;
    };
} | {
    subscribe_events: Record<string, never>;
} | {
    ping: {
        nonce: string;
    };
};
export declare function encodeClientFrame(frame: ClientFrame): Buffer;
export declare function decodeServerFrame(buffer: Buffer): ServerFrame;
//# sourceMappingURL=frames.d.ts.map