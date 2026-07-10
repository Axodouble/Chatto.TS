import type { User } from './resources/user'
import type { Room } from './resources/room'

export class UserCache {
  private readonly cache = new Map<string, User>()
  constructor(private readonly fetcher: (id: string) => Promise<User>) {}
  async resolve(id: string): Promise<User> {
    const cached = this.cache.get(id)
    if (cached != null) return cached
    const user = await this.fetcher(id)
    this.cache.set(id, user)
    return user
  }
}

export class RoomCache {
  private readonly cache = new Map<string, Room>()
  constructor(private readonly fetcher: (id: string) => Promise<Room>) {}
  async resolve(id: string): Promise<Room> {
    const cached = this.cache.get(id)
    if (cached != null) return cached
    const room = await this.fetcher(id)
    this.cache.set(id, room)
    return room
  }
}
