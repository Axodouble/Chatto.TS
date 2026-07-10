import { describe, it, expect, mock } from 'bun:test'
import { UserCache, RoomCache } from '../src/caches'
import { User } from '../src/resources/user'

describe('UserCache', () => {
  it('fetches once and serves subsequent calls from cache', async () => {
    const fetcher = mock(async (id: string) => User.partial(id))
    const cache = new UserCache(fetcher)
    const a = await cache.resolve('U_1')
    const b = await cache.resolve('U_1')
    expect(a).toBe(b)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('fetches distinct ids separately', async () => {
    const fetcher = mock(async (id: string) => User.partial(id))
    const cache = new UserCache(fetcher)
    await cache.resolve('U_1')
    await cache.resolve('U_2')
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
})

describe('RoomCache', () => {
  it('fetches once and serves subsequent calls from cache', async () => {
    const room = { id: 'R_1' } as any
    const fetcher = mock(async () => room)
    const cache = new RoomCache(fetcher)
    expect(await cache.resolve('R_1')).toBe(room)
    expect(await cache.resolve('R_1')).toBe(room)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})
