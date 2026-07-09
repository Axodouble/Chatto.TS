import type { z } from 'zod';
import type { MessageSchema, MessageReactionSchema, CreateMessageInputSchema, UpdateMessageInputSchema } from './schemas/message';
import type { RoomSchema } from './schemas/room';
import type { MessageDeleteEventSchema, ReactionEventSchema } from './schemas/realtime';
export type MessageData = z.infer<typeof MessageSchema>;
export type MessageReaction = z.infer<typeof MessageReactionSchema>;
export type CreateMessageInput = z.infer<typeof CreateMessageInputSchema>;
export type UpdateMessageInput = z.infer<typeof UpdateMessageInputSchema>;
export type RoomData = z.infer<typeof RoomSchema>;
export type MessageDeleteEvent = z.infer<typeof MessageDeleteEventSchema>;
export type ReactionEvent = z.infer<typeof ReactionEventSchema>;
export interface ChattoClientOptions {
    baseUrl: string;
    token: string;
}
//# sourceMappingURL=types.d.ts.map