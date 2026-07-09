"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeConnection = void 0;
const ws_1 = __importDefault(require("ws"));
const events_1 = require("events");
const frames_1 = require("./frames");
class RealtimeConnection extends events_1.EventEmitter {
    wsUrl;
    token;
    wsFactory;
    ws = null;
    heartbeatTimer = null;
    constructor(wsUrl, token, wsFactory = url => new ws_1.default(url)) {
        super();
        this.wsUrl = wsUrl;
        this.token = token;
        this.wsFactory = wsFactory;
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.ws = this.wsFactory(this.wsUrl);
            this.ws.binaryType = 'nodebuffer';
            this.ws.once('open', () => {
                this.send({ hello: { bearer_token: this.token } });
            });
            this.ws.on('message', (data) => {
                let frame;
                try {
                    frame = (0, frames_1.decodeServerFrame)(data);
                }
                catch (err) {
                    this.emit('error', err instanceof Error ? err : new Error(String(err)));
                    return;
                }
                if (frame.hello != null) {
                    const intervalMs = frame.hello.heartbeat_interval_seconds * 1000;
                    this.heartbeatTimer = setInterval(() => {
                        this.send({ ping: { nonce: Date.now().toString(36) } });
                    }, intervalMs);
                    this.send({ subscribe_events: {} });
                    return;
                }
                if (frame.subscribed != null) {
                    resolve();
                    return;
                }
                if (frame.error != null && frame.error.fatal) {
                    reject(new Error(frame.error.message));
                    return;
                }
                if (frame.close != null) {
                    this.cleanup();
                    this.emit('close', frame.close.reconnect, frame.close.retry_after_ms);
                    return;
                }
                this.emit('frame', frame);
            });
            this.ws.on('error', (err) => {
                reject(err);
                this.emit('error', err);
            });
            this.ws.on('close', () => {
                this.cleanup();
                this.emit('close', false, 0);
            });
        });
    }
    disconnect() {
        this.cleanup();
        this.ws?.close();
    }
    send(frame) {
        if (this.ws?.readyState === ws_1.default.OPEN) {
            this.ws.send((0, frames_1.encodeClientFrame)(frame));
        }
    }
    cleanup() {
        if (this.heartbeatTimer != null) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }
}
exports.RealtimeConnection = RealtimeConnection;
//# sourceMappingURL=connection.js.map