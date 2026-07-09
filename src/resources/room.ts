import type { RoomData } from '../types'
import type { RestClient } from '../rest/client'
import type { MessageBuilder } from '../builders/message'
import { MessageResponseSchema } from '../schemas/message'
import { GetRoomEventsResponseSchema } from '../schemas/room'
import { Message } from './message'

export class Room {
  readonly id: string
  readonly name: string
  readonly description: string | undefined
  readonly kind: string
  readonly archived: boolean

  constructor(data: RoomData, private readonly rest: RestClient) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.kind = data.kind
    this.archived = data.archived
  }

  async send(builder: MessageBuilder): Promise<Message> {
    const input = builder.buildCreate(this.id)
    const res = await this.rest.post(
      'chatto.api.v1.MessageService',
      'CreateMessage',
      {
        roomId: input.roomId,
        body: input.body,
        inReplyTo: input.inReplyTo,
        threadRootEventId: input.threadRootEventId,
        alsoSendToChannel: input.alsoSendToChannel,
      },
      MessageResponseSchema,
    )
    return new Message(res.message, this.rest)
  }

  async fetchHistory(opts: { limit?: number; before?: string } = {}): Promise<Message[]> {
    const res = await this.rest.post(
      'chatto.api.v1.RoomService',
      'GetRoomEvents',
      {
        roomId: this.id,
        limit: opts.limit,
        cursor: opts.before != null ? { before: opts.before } : undefined,
      },
      GetRoomEventsResponseSchema,
    )
    return res.page.events
      .filter(e => e.messagePosted != null)
      .map(e => new Message(e.messagePosted!.message, this.rest))
  }
}
