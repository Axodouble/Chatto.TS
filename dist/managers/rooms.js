"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
const room_1 = require("../schemas/room");
const room_2 = require("../resources/room");
class RoomManager {
    rest;
    constructor(rest) {
        this.rest = rest;
    }
    async list() {
        const res = await this.rest.post('chatto.api.v1.RoomDirectoryService', 'ListRooms', {}, room_1.ListRoomsResponseSchema);
        return res.rooms.map(r => new room_2.Room(r.room, this.rest));
    }
    async fetch(roomId) {
        const res = await this.rest.post('chatto.api.v1.RoomDirectoryService', 'GetRoom', { roomId }, room_1.GetRoomResponseSchema);
        return new room_2.Room(res.room.room, this.rest);
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=rooms.js.map