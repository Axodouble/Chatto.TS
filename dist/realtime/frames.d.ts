export interface EventEnvelopePayload {
    id: string;
    created_at: string;
    actor_id: string;
    message_posted?: {
        room_id: string;
        message_event_id: string;
    };
    message_edited?: {
        room_id: string;
        message_event_id: string;
    };
    message_retracted?: {
        room_id: string;
        message_event_id: string;
    };
    reaction_added?: {
        room_id: string;
        message_event_id: string;
        emoji: string;
        actor_id: string;
    };
    reaction_removed?: {
        room_id: string;
        message_event_id: string;
        emoji: string;
        actor_id: string;
    };
}
export interface ServerFrame {
    hello?: {
        heartbeat_interval_seconds: number;
    };
    subscribed?: Record<string, never>;
    event?: EventEnvelopePayload;
    heartbeat?: Record<string, never>;
    pong?: {
        nonce: string;
    };
    error?: {
        fatal: boolean;
        message: string;
    };
    close?: {
        reconnect: boolean;
        retry_after_ms: number;
        message: string;
    };
}
export type ClientFrame = {
    hello: {
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