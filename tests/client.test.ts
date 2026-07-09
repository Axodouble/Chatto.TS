import { describe, it, expect, mock, beforeEach } from 'bun:test'
import { EventEmitter } from 'events'

type MockRt = EventEmitter & { connect: ReturnType<typeof mock>; disconnect: ReturnType<typeof mock> }
const rtInstances: MockRt[] = []

mock.module('../src/realtime/connection', () => {
  return {
    RealtimeConnection: mock(() => {
      const instance = Object.assign(new EventEmitter(), {
        connect: mock(() => Promise.resolve()),
        disconnect: mock(() => {}),
      }) as MockRt
      rtInstances.push(instance)
      return instance
    }),
  }
})

const { ChattoClient } = require('../src/client') as typeof import('../src/client')
const { RoomManager } = require('../src/managers/rooms') as typeof import('../src/managers/rooms')
const { MessageManager } = require('../src/managers/messages') as typeof import('../src/managers/messages')

beforeEach(() => { rtInstances.length = 0 })

describe('ChattoClient', () => {
  it('exposes rooms and messages managers', () => {
    const client = new ChattoClient({ baseUrl: 'https://chat.example.com', token: 'tk' })
    expect(client.rooms).toBeInstanceOf(RoomManager)
    expect(client.messages).toBeInstanceOf(MessageManager)
  })

  it('connect() calls realtime.connect() and emits ready', async () => {
    const client = new ChattoClient({ baseUrl: 'https://chat.example.com', token: 'tk' })
    const readyEvents: unknown[] = []
    client.on('ready', () => readyEvents.push(true))
    await client.connect()
    expect(readyEvents).toHaveLength(1)
    expect(rtInstances[0].connect).toHaveBeenCalled()
  })

  it('disconnect() emits disconnect', async () => {
    const client = new ChattoClient({ baseUrl: 'https://chat.example.com', token: 'tk' })
    const disconnectEvents: unknown[] = []
    client.on('disconnect', () => disconnectEvents.push(true))
    await client.disconnect()
    expect(disconnectEvents).toHaveLength(1)
  })

  it('forwards realtime error events as client error events', () => {
    const client = new ChattoClient({ baseUrl: 'https://chat.example.com', token: 'tk' })
    const errors: Error[] = []
    client.on('error', e => errors.push(e))
    rtInstances[0].emit('error', new Error('ws error'))
    expect(errors[0]?.message).toBe('ws error')
  })

  it('emits disconnect when realtime emits close with reconnect=false', () => {
    const client = new ChattoClient({ baseUrl: 'https://chat.example.com', token: 'tk' })
    const disconnects: unknown[] = []
    client.on('disconnect', () => disconnects.push(true))
    rtInstances[0].emit('close', false, 0)
    expect(disconnects).toHaveLength(1)
  })
})
