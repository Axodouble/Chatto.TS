import type { ClientContext } from '../context'
import { Room } from '../resources/room'
import { mapRoom } from '../rest/mappers'

export class RoomManager {
  constructor(private readonly ctx: ClientContext) {}

  async list(): Promise<Room[]> {
    const res = await this.ctx.clients.roomDirectory.listRooms({})
    return res.rooms.map(r => new Room(mapRoom(r.room!), this.ctx))
  }

  async fetch(roomId: string): Promise<Room> {
    const res = await this.ctx.clients.roomDirectory.getRoom({ roomId })
    return new Room(mapRoom(res.room!.room!), this.ctx)
  }
}
