import { describe, it, expect } from 'bun:test'
import { create } from '@bufbuild/protobuf'
import { timestampFromDate } from '@bufbuild/protobuf/wkt'
import { MessageSchema } from '../../src/gen/chatto/api/v1/message_types_pb'
import { DirectoryMemberSchema } from '../../src/gen/chatto/api/v1/member_directory_pb'
import { RoomSchema } from '../../src/gen/chatto/api/v1/rooms_pb'
import { mapMessage, mapDirectoryMember, mapRoom } from '../../src/rest/mappers'

describe('mapMessage', () => {
  it('converts timestamps to ISO strings and empty scalars to undefined', () => {
    const proto = create(MessageSchema, {
      id: 'evt_1',
      roomId: 'R_1',
      createdAt: timestampFromDate(new Date('2026-07-10T00:00:00.000Z')),
      actorId: 'U_1',
      body: 'hi',
      reactions: [{ emoji: '👍', count: 2, hasReacted: true, previewUserIds: ['U_2'] }],
    })
    const data = mapMessage(proto)
    expect(data).toMatchObject({
      id: 'evt_1', roomId: 'R_1', actorId: 'U_1', body: 'hi',
      createdAt: '2026-07-10T00:00:00.000Z',
      inReplyTo: undefined, threadRootEventId: undefined, updatedAt: undefined,
    })
    expect(data.reactions[0]).toEqual({ emoji: '👍', count: 2, hasReacted: true, previewUserIds: ['U_2'] })
  })
})

describe('mapDirectoryMember', () => {
  it('maps the presence enum to its proto name string', () => {
    const dm = create(DirectoryMemberSchema, {
      user: { id: 'U_1', login: 'ceraia', displayName: 'Ceraia', deleted: false, presenceStatus: 1 },
      roles: ['admin'],
    })
    const data = mapDirectoryMember(dm)
    expect(data.user.presenceStatus).toBe('PRESENCE_STATUS_ONLINE')
    expect(data.user.displayName).toBe('Ceraia')
    expect(data.roles).toEqual(['admin'])
    expect(data.user.avatarUrl).toBeUndefined()
  })
})

describe('mapRoom', () => {
  it('maps the room kind enum to its proto name string', () => {
    const room = create(RoomSchema, { id: 'R_1', name: 'general', kind: 1, archived: false, universal: false })
    const data = mapRoom(room)
    expect(data).toMatchObject({ id: 'R_1', name: 'general', kind: 'ROOM_KIND_CHANNEL', archived: false, universal: false })
    expect(data.description).toBeUndefined()
    expect(data.groupId).toBeUndefined()
  })
})
