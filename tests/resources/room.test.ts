import { describe, it, expect, mock } from 'bun:test'
import { Room } from '../../src/resources/room'
import { Message } from '../../src/resources/message'
import { MessageBuilder } from '../../src/builders/message'

const validRoomData = {
  id: 'room_1',
  name: 'General',
  kind: 'ROOM_KIND_CHANNEL',
  archived: false,
  universal: false,
}

const validMessage = {
  id: 'evt_1',
  roomId: 'room_1',
  createdAt: '2026-07-09T10:00:00Z',
  actorId: 'user_1',
  reactions: [],
}

function makeRestMock(returnValue: unknown) {
  return { post: mock().mockResolvedValue(returnValue) }
}

describe('Room', () => {
  it('exposes data properties', () => {
    const room = new Room(validRoomData, makeRestMock(null) as any)
    expect(room.id).toBe('room_1')
    expect(room.name).toBe('General')
    expect(room.archived).toBe(false)
  })

  describe('.send()', () => {
    it('calls CreateMessage and returns a Message', async () => {
      const rest = makeRestMock({ message: validMessage })
      const room = new Room(validRoomData, rest as any)
      const msg = await room.send(new MessageBuilder().setContent('Hello'))
      expect(rest.post).toHaveBeenCalledWith(
        'chatto.api.v1.MessageService',
        'CreateMessage',
        expect.objectContaining({ roomId: 'room_1', body: 'Hello' }),
        expect.anything(),
      )
      expect(msg).toBeInstanceOf(Message)
    })
  })

  describe('.fetchHistory()', () => {
    it('calls GetRoomEvents and returns Message[]', async () => {
      const rest = makeRestMock({
        page: {
          events: [
            { id: 'evt_1', createdAt: '2026-07-09T10:00:00Z', actorId: 'user_1',
              messagePosted: { message: validMessage } },
          ],
          hasOlder: false,
          hasNewer: false,
        },
      })
      const room = new Room(validRoomData, rest as any)
      const msgs = await room.fetchHistory({ limit: 20 })
      expect(rest.post).toHaveBeenCalledWith(
        'chatto.api.v1.RoomService',
        'GetRoomEvents',
        expect.objectContaining({ roomId: 'room_1', limit: 20 }),
        expect.anything(),
      )
      expect(msgs).toHaveLength(1)
      expect(msgs[0]).toBeInstanceOf(Message)
    })

    it('filters out non-message timeline events', async () => {
      const rest = makeRestMock({
        page: {
          events: [
            { id: 'evt_system', createdAt: '2026-07-09T10:00:00Z', actorId: 'system' },
          ],
          hasOlder: false,
          hasNewer: false,
        },
      })
      const room = new Room(validRoomData, rest as any)
      const msgs = await room.fetchHistory()
      expect(msgs).toHaveLength(0)
    })

    it('passes before cursor when provided', async () => {
      const rest = makeRestMock({ page: { events: [], hasOlder: false, hasNewer: false } })
      const room = new Room(validRoomData, rest as any)
      await room.fetchHistory({ before: 'cursor_abc' })
      expect(rest.post).toHaveBeenCalledWith(
        'chatto.api.v1.RoomService',
        'GetRoomEvents',
        expect.objectContaining({ cursor: { before: 'cursor_abc' } }),
        expect.anything(),
      )
    })
  })
})
