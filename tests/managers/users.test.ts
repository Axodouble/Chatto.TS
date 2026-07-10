import { describe, it, expect, mock } from 'bun:test'
import { UserManager } from '../../src/managers/users'
import { User } from '../../src/resources/user'

const protoMember = { user: { id: 'U_1', login: 'ceraia', displayName: 'Ceraia', deleted: false, presenceStatus: 1, avatarUrl: undefined }, roles: [] }

function makeCtx(clientImpl: any) { return { clients: { user: clientImpl } } as any }

describe('UserManager', () => {
  it('fetch() calls getUser and returns a User', async () => {
    const getUser = mock().mockResolvedValue({ user: protoMember })
    const u = await new UserManager(makeCtx({ getUser })).fetch('U_1')
    expect(getUser).toHaveBeenCalledWith({ target: { case: 'userId', value: 'U_1' } })
    expect(u).toBeInstanceOf(User)
    expect(u.displayName).toBe('Ceraia')
    expect(u.presenceStatus).toBe('PRESENCE_STATUS_ONLINE')
  })

  it('batchFetch() calls batchGetUsers', async () => {
    const batchGetUsers = mock().mockResolvedValue({ users: [protoMember] })
    const users = await new UserManager(makeCtx({ batchGetUsers })).batchFetch(['U_1'])
    expect(batchGetUsers).toHaveBeenCalledWith({ userIds: ['U_1'] })
    expect(users).toHaveLength(1)
  })

  it('list() calls listUsers with search', async () => {
    const listUsers = mock().mockResolvedValue({ users: [protoMember] })
    await new UserManager(makeCtx({ listUsers })).list({ search: 'ce' })
    expect(listUsers).toHaveBeenCalledWith({ search: 'ce' })
  })
})
