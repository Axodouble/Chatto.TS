import type { RestClient } from '../rest/client'
import { ListRoomsResponseSchema, GetRoomResponseSchema } from '../schemas/room'
import { Room } from '../resources/room'

export class RoomManager {
  constructor(private readonly rest: RestClient) {}

  async list(): Promise<Room[]> {
    const res = await this.rest.post(
      'chatto.api.v1.RoomDirectoryService',
      'ListRooms',
      {},
      ListRoomsResponseSchema,
    )
    return res.rooms.map(r => new Room(r.room, this.rest))
  }

  async fetch(roomId: string): Promise<Room> {
    const res = await this.rest.post(
      'chatto.api.v1.RoomDirectoryService',
      'GetRoom',
      { roomId },
      GetRoomResponseSchema,
    )
    return new Room(res.room.room, this.rest)
  }
}
