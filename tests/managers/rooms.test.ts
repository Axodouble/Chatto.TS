import { describe, it, expect, mock } from 'bun:test'
import { RoomManager } from '../../src/managers/rooms'
import { Room } from '../../src/resources/room'

const protoRoom = { id: 'R_1', name: 'general', kind: 1, description: '', archived: false, groupId: '', universal: false }

function makeCtx(clientImpl: any) { return { clients: { roomDirectory: clientImpl } } as any }

describe('RoomManager', () => {
  it('list() calls listRooms and maps RoomWithViewerState', async () => {
    const listRooms = mock().mockResolvedValue({ rooms: [{ room: protoRoom }] })
    const rooms = await new RoomManager(makeCtx({ listRooms })).list()
    expect(listRooms).toHaveBeenCalledWith({})
    expect(rooms[0]).toBeInstanceOf(Room)
    expect(rooms[0].name).toBe('general')
    expect(rooms[0].kind).toBe('ROOM_KIND_CHANNEL')
  })

  it('fetch() calls getRoom and maps the wrapped room', async () => {
    const getRoom = mock().mockResolvedValue({ room: { room: protoRoom } })
    const room = await new RoomManager(makeCtx({ getRoom })).fetch('R_1')
    expect(getRoom).toHaveBeenCalledWith({ roomId: 'R_1' })
    expect(room.name).toBe('general')
  })
})
