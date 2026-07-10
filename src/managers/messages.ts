import type { ClientContext } from '../context'
import type { Message } from '../resources/message'
import type { MessagePayload } from '../builders/payload'
import { resolveMessagePayload } from '../builders/payload'
import { mapMessage } from '../rest/mappers'

export class MessageManager {
  constructor(private readonly ctx: ClientContext) {}

  async send(roomId: string, payload: MessagePayload): Promise<Message> {
    const input = resolveMessagePayload(payload).buildCreate(roomId)
    const res = await this.ctx.clients.message.createMessage({
      roomId: input.roomId,
      body: input.body,
      inReplyTo: input.inReplyTo,
      threadRootEventId: input.threadRootEventId,
      alsoSendToChannel: input.alsoSendToChannel,
    })
    return this.ctx.hydrateMessage(mapMessage(res.message!))
  }

  async fetch(roomId: string, eventId: string): Promise<Message> {
    const res = await this.ctx.clients.message.getMessage({ roomId, eventId })
    return this.ctx.hydrateMessage(mapMessage(res.message!))
  }
}
