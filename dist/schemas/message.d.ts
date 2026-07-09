import { z } from 'zod';
export declare const MessageReactionSchema: z.ZodObject<{
    emoji: z.ZodString;
    count: z.ZodNumber;
    hasReacted: z.ZodBoolean;
    previewUserIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    emoji: string;
    count: number;
    hasReacted: boolean;
    previewUserIds: string[];
}, {
    emoji: string;
    count: number;
    hasReacted: boolean;
    previewUserIds?: string[] | undefined;
}>;
export declare const MessageSchema: z.ZodObject<{
    id: z.ZodString;
    roomId: z.ZodString;
    createdAt: z.ZodString;
    actorId: z.ZodString;
    body: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    inReplyTo: z.ZodOptional<z.ZodString>;
    threadRootEventId: z.ZodOptional<z.ZodString>;
    reactions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        emoji: z.ZodString;
        count: z.ZodNumber;
        hasReacted: z.ZodBoolean;
        previewUserIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        emoji: string;
        count: number;
        hasReacted: boolean;
        previewUserIds: string[];
    }, {
        emoji: string;
        count: number;
        hasReacted: boolean;
        previewUserIds?: string[] | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    roomId: string;
    createdAt: string;
    actorId: string;
    reactions: {
        emoji: string;
        count: number;
        hasReacted: boolean;
        previewUserIds: string[];
    }[];
    body?: string | undefined;
    updatedAt?: string | undefined;
    inReplyTo?: string | undefined;
    threadRootEventId?: string | undefined;
}, {
    id: string;
    roomId: string;
    createdAt: string;
    actorId: string;
    body?: string | undefined;
    updatedAt?: string | undefined;
    inReplyTo?: string | undefined;
    threadRootEventId?: string | undefined;
    reactions?: {
        emoji: string;
        count: number;
        hasReacted: boolean;
        previewUserIds?: string[] | undefined;
    }[] | undefined;
}>;
export declare const CreateMessageInputSchema: z.ZodObject<{
    roomId: z.ZodString;
    body: z.ZodOptional<z.ZodString>;
    inReplyTo: z.ZodOptional<z.ZodString>;
    threadRootEventId: z.ZodOptional<z.ZodString>;
    alsoSendToChannel: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    roomId: string;
    body?: string | undefined;
    inReplyTo?: string | undefined;
    threadRootEventId?: string | undefined;
    alsoSendToChannel?: boolean | undefined;
}, {
    roomId: string;
    body?: string | undefined;
    inReplyTo?: string | undefined;
    threadRootEventId?: string | undefined;
    alsoSendToChannel?: boolean | undefined;
}>;
export declare const UpdateMessageInputSchema: z.ZodObject<{
    roomId: z.ZodString;
    eventId: z.ZodString;
    body: z.ZodOptional<z.ZodString>;
    alsoSendToChannel: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    roomId: string;
    eventId: string;
    body?: string | undefined;
    alsoSendToChannel?: boolean | undefined;
}, {
    roomId: string;
    eventId: string;
    body?: string | undefined;
    alsoSendToChannel?: boolean | undefined;
}>;
export declare const MessageResponseSchema: z.ZodObject<{
    message: z.ZodObject<{
        id: z.ZodString;
        roomId: z.ZodString;
        createdAt: z.ZodString;
        actorId: z.ZodString;
        body: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
        inReplyTo: z.ZodOptional<z.ZodString>;
        threadRootEventId: z.ZodOptional<z.ZodString>;
        reactions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            emoji: z.ZodString;
            count: z.ZodNumber;
            hasReacted: z.ZodBoolean;
            previewUserIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            emoji: string;
            count: number;
            hasReacted: boolean;
            previewUserIds: string[];
        }, {
            emoji: string;
            count: number;
            hasReacted: boolean;
            previewUserIds?: string[] | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        roomId: string;
        createdAt: string;
        actorId: string;
        reactions: {
            emoji: string;
            count: number;
            hasReacted: boolean;
            previewUserIds: string[];
        }[];
        body?: string | undefined;
        updatedAt?: string | undefined;
        inReplyTo?: string | undefined;
        threadRootEventId?: string | undefined;
    }, {
        id: string;
        roomId: string;
        createdAt: string;
        actorId: string;
        body?: string | undefined;
        updatedAt?: string | undefined;
        inReplyTo?: string | undefined;
        threadRootEventId?: string | undefined;
        reactions?: {
            emoji: string;
            count: number;
            hasReacted: boolean;
            previewUserIds?: string[] | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    message: {
        id: string;
        roomId: string;
        createdAt: string;
        actorId: string;
        reactions: {
            emoji: string;
            count: number;
            hasReacted: boolean;
            previewUserIds: string[];
        }[];
        body?: string | undefined;
        updatedAt?: string | undefined;
        inReplyTo?: string | undefined;
        threadRootEventId?: string | undefined;
    };
}, {
    message: {
        id: string;
        roomId: string;
        createdAt: string;
        actorId: string;
        body?: string | undefined;
        updatedAt?: string | undefined;
        inReplyTo?: string | undefined;
        threadRootEventId?: string | undefined;
        reactions?: {
            emoji: string;
            count: number;
            hasReacted: boolean;
            previewUserIds?: string[] | undefined;
        }[] | undefined;
    };
}>;
export declare const DeleteMessageResponseSchema: z.ZodObject<{
    deleted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    deleted: boolean;
}, {
    deleted: boolean;
}>;
export declare const AddReactionResponseSchema: z.ZodObject<{
    added: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    added: boolean;
}, {
    added: boolean;
}>;
export declare const RemoveReactionResponseSchema: z.ZodObject<{
    removed: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    removed: boolean;
}, {
    removed: boolean;
}>;
//# sourceMappingURL=message.d.ts.map