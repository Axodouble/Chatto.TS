import { z } from 'zod';
export declare const MessageDeleteEventSchema: z.ZodObject<{
    roomId: z.ZodString;
    eventId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    roomId: string;
    eventId: string;
}, {
    roomId: string;
    eventId: string;
}>;
export declare const ReactionEventSchema: z.ZodObject<{
    roomId: z.ZodString;
    messageEventId: z.ZodString;
    emoji: z.ZodString;
    actorId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    emoji: string;
    roomId: string;
    messageEventId: string;
    actorId?: string | undefined;
}, {
    emoji: string;
    roomId: string;
    messageEventId: string;
    actorId?: string | undefined;
}>;
//# sourceMappingURL=realtime.d.ts.map