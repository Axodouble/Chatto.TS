"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersResponseSchema = exports.BatchGetUsersResponseSchema = exports.GetUserResponseSchema = exports.DirectoryMemberSchema = exports.UserSchema = exports.CustomUserStatusSchema = exports.PresenceStatusSchema = void 0;
const zod_1 = require("zod");
exports.PresenceStatusSchema = zod_1.z.enum([
    'PRESENCE_STATUS_UNSPECIFIED',
    'PRESENCE_STATUS_ONLINE',
    'PRESENCE_STATUS_AWAY',
    'PRESENCE_STATUS_DO_NOT_DISTURB',
    'PRESENCE_STATUS_OFFLINE',
]);
exports.CustomUserStatusSchema = zod_1.z.object({
    emoji: zod_1.z.string(),
    text: zod_1.z.string(),
    expiresAt: zod_1.z.string().optional(),
});
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    login: zod_1.z.string(),
    displayName: zod_1.z.string(),
    deleted: zod_1.z.boolean().default(false),
    avatarUrl: zod_1.z.string().optional(),
    presenceStatus: exports.PresenceStatusSchema,
    customStatus: exports.CustomUserStatusSchema.optional(),
});
exports.DirectoryMemberSchema = zod_1.z.object({
    user: exports.UserSchema,
    roles: zod_1.z.array(zod_1.z.string()).default([]),
    createdAt: zod_1.z.string().optional(),
});
exports.GetUserResponseSchema = zod_1.z.object({ user: exports.DirectoryMemberSchema });
exports.BatchGetUsersResponseSchema = zod_1.z.object({ users: zod_1.z.array(exports.DirectoryMemberSchema) });
exports.ListUsersResponseSchema = zod_1.z.object({ users: zod_1.z.array(exports.DirectoryMemberSchema) });
//# sourceMappingURL=user.js.map