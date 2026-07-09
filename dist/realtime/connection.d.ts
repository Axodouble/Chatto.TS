import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { type ServerFrame } from './frames';
interface RealtimeConnectionEvents {
    frame: [frame: ServerFrame];
    error: [err: Error];
    close: [reconnect: boolean, retryAfterMs: number];
}
export declare class RealtimeConnection extends EventEmitter<RealtimeConnectionEvents> {
    private readonly wsUrl;
    private readonly token;
    private readonly wsFactory;
    private ws;
    private heartbeatTimer;
    constructor(wsUrl: string, token: string, wsFactory?: (url: string) => WebSocket);
    connect(): Promise<void>;
    disconnect(): void;
    private send;
    private cleanup;
}
export {};
//# sourceMappingURL=connection.d.ts.map