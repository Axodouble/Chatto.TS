import type { z } from 'zod'
import type { CreateMessageInputSchema, UpdateMessageInputSchema } from './schemas/message'
import type { MessageDeleteEventSchema, ReactionEventSchema } from './schemas/realtime'

export interface MessageReaction {
  emoji: string
  count: number
  hasReacted: boolean
  previewUserIds: string[]
}

export interface MessageData {
  id: string
  roomId: string
  createdAt: string
  actorId: string
  body?: string
  updatedAt?: string
  inReplyTo?: string
  threadRootEventId?: string
  reactions: MessageReaction[]
}

export interface UserData {
  id: string
  login: string
  displayName: string
  deleted: boolean
  avatarUrl?: string
  presenceStatus: string
  customStatus?: { emoji: string; text: string; expiresAt?: string }
}

export interface DirectoryMemberData {
  user: UserData
  roles: string[]
  createdAt?: string
}

export interface RoomData {
  id: string
  name: string
  kind: string
  description?: string
  archived: boolean
  groupId?: string
  universal: boolean
}

export type CreateMessageInput = z.infer<typeof CreateMessageInputSchema>
export type UpdateMessageInput = z.infer<typeof UpdateMessageInputSchema>
export type MessageDeleteEvent = z.infer<typeof MessageDeleteEventSchema>
export type ReactionEvent = z.infer<typeof ReactionEventSchema>

export interface ChattoClientOptions {
  baseUrl: string
  token: string
}
