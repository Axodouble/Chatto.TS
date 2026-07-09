"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const message_1 = require("../schemas/message");
const user_1 = require("./user");
class Message {
    rest;
    id;
    roomId;
    body;
    actorId;
    author;
    createdAt;
    updatedAt;
    constructor(data, rest) {
        this.rest = rest;
        this.id = data.id;
        this.roomId = data.roomId;
        this.body = data.body;
        this.actorId = data.actorId;
        this.author = new user_1.PartialUser(data.actorId, rest);
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
    async edit(builder) {
        const input = builder.buildUpdate(this.roomId, this.id);
        const res = await this.rest.post('chatto.api.v1.MessageService', 'UpdateMessage', { roomId: input.roomId, eventId: input.eventId, body: input.body, alsoSendToChannel: input.alsoSendToChannel }, message_1.MessageResponseSchema);
        return new Message(res.message, this.rest);
    }
    async delete() {
        await this.rest.post('chatto.api.v1.MessageService', 'DeleteMessage', { roomId: this.roomId, eventId: this.id }, message_1.DeleteMessageResponseSchema);
    }
    async react(emoji) {
        await this.rest.post('chatto.api.v1.MessageService', 'AddReaction', { roomId: this.roomId, messageEventId: this.id, emoji }, message_1.AddReactionResponseSchema);
    }
    async removeReaction(emoji) {
        await this.rest.post('chatto.api.v1.MessageService', 'RemoveReaction', { roomId: this.roomId, messageEventId: this.id, emoji }, message_1.RemoveReactionResponseSchema);
    }
}
exports.Message = Message;
//# sourceMappingURL=message.js.map