"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveReactionResponseSchema = exports.AddReactionResponseSchema = exports.DeleteMessageResponseSchema = exports.MessageResponseSchema = exports.UpdateMessageInputSchema = exports.CreateMessageInputSchema = exports.MessageSchema = exports.MessageReactionSchema = void 0;
const zod_1 = require("zod");
exports.MessageReactionSchema = zod_1.z.object({
    emoji: zod_1.z.string(),
    count: zod_1.z.number().int(),
    hasReacted: zod_1.z.boolean(),
    previewUserIds: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.MessageSchema = zod_1.z.object({
    id: zod_1.z.string(),
    roomId: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    actorId: zod_1.z.string(),
    body: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
    inReplyTo: zod_1.z.string().optional(),
    threadRootEventId: zod_1.z.string().optional(),
    reactions: zod_1.z.array(exports.MessageReactionSchema).default([]),
});
exports.CreateMessageInputSchema = zod_1.z.object({
    roomId: zod_1.z.string(),
    body: zod_1.z.string().optional(),
    inReplyTo: zod_1.z.string().optional(),
    threadRootEventId: zod_1.z.string().optional(),
    alsoSendToChannel: zod_1.z.boolean().optional(),
});
exports.UpdateMessageInputSchema = zod_1.z.object({
    roomId: zod_1.z.string(),
    eventId: zod_1.z.string(),
    body: zod_1.z.string().optional(),
    alsoSendToChannel: zod_1.z.boolean().optional(),
});
exports.MessageResponseSchema = zod_1.z.object({ message: exports.MessageSchema });
exports.DeleteMessageResponseSchema = zod_1.z.object({ deleted: zod_1.z.boolean() });
exports.AddReactionResponseSchema = zod_1.z.object({ added: zod_1.z.boolean() });
exports.RemoveReactionResponseSchema = zod_1.z.object({ removed: zod_1.z.boolean() });
//# sourceMappingURL=message.js.map