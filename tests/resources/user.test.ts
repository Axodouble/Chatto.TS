import { describe, it, expect, mock } from 'bun:test'
import { User, PartialUser } from '../../src/resources/user'

const validMember = {
  user: {
    id: 'user_1',
    login: 'ceraia',
    displayName: 'Ceraia',
    deleted: false,
    avatarUrl: 'https://example.com/avatar.png',
    presenceStatus: 'PRESENCE_STATUS_ONLINE' as const,
    customStatus: { emoji: '🎉', text: 'Celebrating' },
  },
  roles: ['everyone', 'admin'],
  createdAt: '2026-01-01T00:00:00Z',
}

function makeRestMock(returnValue: unknown) {
  return { post: mock().mockResolvedValue(returnValue) }
}

describe('User', () => {
  it('exposes all data properties', () => {
    const user = new User(validMember)
    expect(user.id).toBe('user_1')
    expect(user.login).toBe('ceraia')
    expect(user.displayName).toBe('Ceraia')
    expect(user.deleted).toBe(false)
    expect(user.avatarUrl).toBe('https://example.com/avatar.png')
    expect(user.presenceStatus).toBe('PRESENCE_STATUS_ONLINE')
    expect(user.customStatus?.emoji).toBe('🎉')
    expect(user.roles).toEqual(['everyone', 'admin'])
    expect(user.createdAt).toBe('2026-01-01T00:00:00Z')
  })
})

describe('PartialUser', () => {
  it('exposes id', () => {
    const partial = new PartialUser('user_1', makeRestMock(null) as any)
    expect(partial.id).toBe('user_1')
  })

  describe('.fetch()', () => {
    it('calls GetUser and returns a User', async () => {
      const rest = makeRestMock({ user: validMember })
      const partial = new PartialUser('user_1', rest as any)
      const user = await partial.fetch()
      expect(rest.post).toHaveBeenCalledWith(
        'chatto.api.v1.UserService',
        'GetUser',
        { userId: 'user_1' },
        expect.anything(),
      )
      expect(user).toBeInstanceOf(User)
      expect(user.login).toBe('ceraia')
    })
  })
})
