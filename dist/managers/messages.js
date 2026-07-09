"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageManager = void 0;
const message_1 = require("../schemas/message");
const message_2 = require("../resources/message");
class MessageManager {
    rest;
    constructor(rest) {
        this.rest = rest;
    }
    async send(roomId, builder) {
        const input = builder.buildCreate(roomId);
        const res = await this.rest.post('chatto.api.v1.MessageService', 'CreateMessage', {
            roomId: input.roomId,
            body: input.body,
            inReplyTo: input.inReplyTo,
            threadRootEventId: input.threadRootEventId,
            alsoSendToChannel: input.alsoSendToChannel,
        }, message_1.MessageResponseSchema);
        return new message_2.Message(res.message, this.rest);
    }
    async fetch(roomId, eventId) {
        const res = await this.rest.post('chatto.api.v1.MessageService', 'GetMessage', { roomId, eventId }, message_1.MessageResponseSchema);
        return new message_2.Message(res.message, this.rest);
    }
}
exports.MessageManager = MessageManager;
//# sourceMappingURL=messages.js.map