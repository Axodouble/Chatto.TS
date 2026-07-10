import { describe, it, expect, mock } from 'bun:test'
import { MessageManager } from '../../src/managers/messages'
import { Message } from '../../src/resources/message'
import { Room } from '../../src/resources/room'
import { User } from '../../src/resources/user'

// Proto-shaped message (Timestamp object, camelCase). mapMessage() converts it.
const protoMsg = {
  id: 'evt_1', roomId: 'R_1',
  createdAt: { seconds: 0n, nanos: 0 }, actorId: 'U_1', body: 'hi',
  updatedAt: undefined, inReplyTo: '', threadRootEventId: '', reactions: [],
}

function makeCtx(clientImpl: any) {
  const ctx: any = {
    clients: { message: clientImpl },
    hydrateMessage: mock(async (data: any) => new Message(data, ctx, {
      author: User.partial(data.actorId), channel: Room.partial(data.roomId, ctx),
    })),
  }
  return ctx
}

describe('MessageManager', () => {
  it('send() calls createMessage and returns a hydrated Message', async () => {
    const createMessage = mock().mockResolvedValue({ message: protoMsg })
    const ctx = makeCtx({ createMessage })
    const sent = await new MessageManager(ctx).send('R_1', 'hi')
    expect(createMessage).toHaveBeenCalledWith(expect.objectContaining({ roomId: 'R_1', body: 'hi' }))
    expect(sent).toBeInstanceOf(Message)
    expect(sent.content).toBe('hi')
  })

  it('fetch() calls getMessage and returns a hydrated Message', async () => {
    const getMessage = mock().mockResolvedValue({ message: protoMsg })
    const ctx = makeCtx({ getMessage })
    const msg = await new MessageManager(ctx).fetch('R_1', 'evt_1')
    expect(getMessage).toHaveBeenCalledWith({ roomId: 'R_1', eventId: 'evt_1' })
    expect(msg.content).toBe('hi')
  })
})
