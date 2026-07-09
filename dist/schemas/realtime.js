"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionEventSchema = exports.MessageDeleteEventSchema = void 0;
const zod_1 = require("zod");
exports.MessageDeleteEventSchema = zod_1.z.object({
    roomId: zod_1.z.string(),
    eventId: zod_1.z.string(),
});
exports.ReactionEventSchema = zod_1.z.object({
    roomId: zod_1.z.string(),
    messageEventId: zod_1.z.string(),
    emoji: zod_1.z.string(),
    actorId: zod_1.z.string().optional(),
});
//# sourceMappingURL=realtime.js.map