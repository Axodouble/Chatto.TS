import { describe, it, expect, mock } from 'bun:test'
import { EventEmitter } from 'events'
import { ChattoClient } from '../src/client'
import { RoomManager } from '../src/managers/rooms'
import { MessageManager } from '../src/managers/messages'
import type { RealtimeConnection } from '../src/realtime/connection'

type MockRt = EventEmitter & {
  connect: ReturnType<typeof mock>
  disconnect: ReturnType<typeof mock>
}

function makeMockRt(): MockRt {
  return Object.assign(new EventEmitter(), {
    connect: mock(() => Promise.resolve()),
    disconnect: mock(() => {}),
  }) as MockRt
}

function makeClient(mockRt: MockRt): ChattoClient {
  return new ChattoClient(
    { baseUrl: 'https://chat.example.com', token: 'tk' },
    () => mockRt as unknown as RealtimeConnection,
  )
}

describe('ChattoClient', () => {
  it('exposes rooms and messages managers', () => {
    const client = makeClient(makeMockRt())
    expect(client.rooms).toBeInstanceOf(RoomManager)
    expect(client.messages).toBeInstanceOf(MessageManager)
  })

  it('connect() calls realtime.connect() and emits ready', async () => {
    const mockRt = makeMockRt()
    const client = makeClient(mockRt)
    const readyEvents: unknown[] = []
    client.on('ready', () => readyEvents.push(true))
    await client.connect()
    expect(readyEvents).toHaveLength(1)
    expect(mockRt.connect).toHaveBeenCalled()
  })

  it('disconnect() emits disconnect', async () => {
    const client = makeClient(makeMockRt())
    const disconnectEvents: unknown[] = []
    client.on('disconnect', () => disconnectEvents.push(true))
    await client.disconnect()
    expect(disconnectEvents).toHaveLength(1)
  })

  it('forwards realtime error events as client error events', () => {
    const mockRt = makeMockRt()
    const client = makeClient(mockRt)
    const errors: Error[] = []
    client.on('error', e => errors.push(e))
    mockRt.emit('error', new Error('ws error'))
    expect(errors[0]?.message).toBe('ws error')
  })

  it('emits disconnect when realtime emits close with reconnect=false', () => {
    const mockRt = makeMockRt()
    const client = makeClient(mockRt)
    const disconnects: unknown[] = []
    client.on('disconnect', () => disconnects.push(true))
    mockRt.emit('close', false, 0)
    expect(disconnects).toHaveLength(1)
  })
})
