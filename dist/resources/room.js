"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const message_1 = require("../schemas/message");
const room_1 = require("../schemas/room");
const message_2 = require("./message");
class Room {
    rest;
    id;
    name;
    description;
    kind;
    archived;
    constructor(data, rest) {
        this.rest = rest;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.kind = data.kind;
        this.archived = data.archived;
    }
    async send(builder) {
        const input = builder.buildCreate(this.id);
        const res = await this.rest.post('chatto.api.v1.MessageService', 'CreateMessage', {
            roomId: input.roomId,
            body: input.body,
            inReplyTo: input.inReplyTo,
            threadRootEventId: input.threadRootEventId,
            alsoSendToChannel: input.alsoSendToChannel,
        }, message_1.MessageResponseSchema);
        return new message_2.Message(res.message, this.rest);
    }
    async fetchHistory(opts = {}) {
        const res = await this.rest.post('chatto.api.v1.RoomService', 'GetRoomEvents', {
            roomId: this.id,
            limit: opts.limit,
            cursor: opts.before != null ? { before: opts.before } : undefined,
        }, room_1.GetRoomEventsResponseSchema);
        return res.page.events
            .filter(e => e.messagePosted != null)
            .map(e => new message_2.Message(e.messagePosted.message, this.rest));
    }
}
exports.Room = Room;
//# sourceMappingURL=room.js.map