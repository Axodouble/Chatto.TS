import type { ClientContext } from '../context'
import { User } from '../resources/user'
import { mapDirectoryMember } from '../rest/mappers'

export class UserManager {
  constructor(private readonly ctx: ClientContext) {}

  async fetch(userId: string): Promise<User> {
    // GetUserRequest.target is a oneof over scalar fields (user_id/login); the
    // generated init shape keeps the runtime `{ case, value }` ADT shape for
    // scalar oneofs rather than accepting a flattened `{ userId }` field.
    const res = await this.ctx.clients.user.getUser({ target: { case: 'userId', value: userId } })
    return new User(mapDirectoryMember(res.user!))
  }

  async batchFetch(userIds: string[]): Promise<User[]> {
    const res = await this.ctx.clients.user.batchGetUsers({ userIds })
    return res.users.map(m => new User(mapDirectoryMember(m)))
  }

  async list(opts: { search?: string } = {}): Promise<User[]> {
    const res = await this.ctx.clients.user.listUsers({ search: opts.search })
    return res.users.map(m => new User(mapDirectoryMember(m)))
  }
}
