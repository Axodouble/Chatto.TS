import type { RestClient } from '../rest/client';
import type { MessageBuilder } from '../builders/message';
import { Message } from '../resources/message';
export declare class MessageManager {
    private readonly rest;
    constructor(rest: RestClient);
    send(roomId: string, builder: MessageBuilder): Promise<Message>;
    fetch(roomId: string, eventId: string): Promise<Message>;
}
//# sourceMappingURL=messages.d.ts.map