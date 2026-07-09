import type { MessageData } from '../types';
import type { RestClient } from '../rest/client';
import type { MessageBuilder } from '../builders/message';
import { PartialUser } from './user';
export declare class Message {
    private readonly rest;
    readonly id: string;
    readonly roomId: string;
    readonly body: string | undefined;
    readonly actorId: string;
    readonly author: PartialUser;
    readonly createdAt: string;
    readonly updatedAt: string | undefined;
    constructor(data: MessageData, rest: RestClient);
    edit(builder: MessageBuilder): Promise<Message>;
    delete(): Promise<void>;
    react(emoji: string): Promise<void>;
    removeReaction(emoji: string): Promise<void>;
}
//# sourceMappingURL=message.d.ts.map