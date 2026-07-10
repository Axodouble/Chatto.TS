import type { RestClient } from './rest/client'
import type { MessageData } from './types'
import type { Message } from './resources/message'
import type { User } from './resources/user'
import type { Room } from './resources/room'

export interface ClientContext {
  readonly rest: RestClient
  resolveUser(id: string): Promise<User>
  resolveRoom(id: string): Promise<Room>
  hydrateMessage(data: MessageData): Promise<Message>
}
