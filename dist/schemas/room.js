"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoomEventsResponseSchema = exports.GetRoomResponseSchema = exports.ListRoomsResponseSchema = exports.RoomSchema = void 0;
const zod_1 = require("zod");
const message_1 = require("./message");
exports.RoomSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    kind: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    archived: zod_1.z.boolean().default(false),
    groupId: zod_1.z.string().optional(),
    universal: zod_1.z.boolean().default(false),
});
const RoomWithViewerStateSchema = zod_1.z.object({
    room: exports.RoomSchema,
    viewerState: zod_1.z.unknown().optional(),
});
exports.ListRoomsResponseSchema = zod_1.z.object({
    rooms: zod_1.z.array(RoomWithViewerStateSchema),
});
exports.GetRoomResponseSchema = zod_1.z.object({
    room: RoomWithViewerStateSchema,
});
const RoomMessagePostedSchema = zod_1.z.object({
    message: message_1.MessageSchema,
});
const RoomTimelineEventSchema = zod_1.z.object({
    id: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    actorId: zod_1.z.string(),
    messagePosted: RoomMessagePostedSchema.optional(),
});
exports.GetRoomEventsResponseSchema = zod_1.z.object({
    page: zod_1.z.object({
        events: zod_1.z.array(RoomTimelineEventSchema),
        startCursor: zod_1.z.string().optional(),
        endCursor: zod_1.z.string().optional(),
        hasOlder: zod_1.z.boolean().default(false),
        hasNewer: zod_1.z.boolean().default(false),
    }),
});
//# sourceMappingURL=room.js.map