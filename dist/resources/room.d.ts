import type { RoomData } from '../types';
import type { RestClient } from '../rest/client';
import type { MessageBuilder } from '../builders/message';
import { Message } from './message';
export declare class Room {
    private readonly rest;
    readonly id: string;
    readonly name: string;
    readonly description: string | undefined;
    readonly kind: string;
    readonly archived: boolean;
    constructor(data: RoomData, rest: RestClient);
    send(builder: MessageBuilder): Promise<Message>;
    fetchHistory(opts?: {
        limit?: number;
        before?: string;
    }): Promise<Message[]>;
}
//# sourceMappingURL=room.d.ts.map