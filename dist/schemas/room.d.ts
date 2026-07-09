import { z } from 'zod';
export declare const RoomSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    kind: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    archived: z.ZodDefault<z.ZodBoolean>;
    groupId: z.ZodOptional<z.ZodString>;
    universal: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    kind: string;
    archived: boolean;
    universal: boolean;
    description?: string | undefined;
    groupId?: string | undefined;
}, {
    id: string;
    name: string;
    kind: string;
    description?: string | undefined;
    archived?: boolean | undefined;
    groupId?: string | undefined;
    universal?: boolean | undefined;
}>;
export declare const ListRoomsResponseSchema: z.ZodObject<{
    rooms: z.ZodArray<z.ZodObject<{
        room: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            kind: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            archived: z.ZodDefault<z.ZodBoolean>;
            groupId: z.ZodOptional<z.ZodString>;
            universal: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            kind: string;
            archived: boolean;
            universal: boolean;
            description?: string | undefined;
            groupId?: string | undefined;
        }, {
            id: string;
            name: string;
            kind: string;
            description?: string | undefined;
            archived?: boolean | undefined;
            groupId?: string | undefined;
            universal?: boolean | undefined;
        }>;
        viewerState: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        room: {
            id: string;
            name: string;
            kind: string;
            archived: boolean;
            universal: boolean;
            description?: string | undefined;
            groupId?: string | undefined;
        };
        viewerState?: unknown;
    }, {
        room: {
            id: string;
            name: string;
            kind: string;
            description?: string | undefined;
            archived?: boolean | undefined;
            groupId?: string | undefined;
            universal?: boolean | undefined;
        };
        viewerState?: unknown;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    rooms: {
        room: {
            id: string;
            name: string;
            kind: string;
            archived: boolean;
            universal: boolean;
            description?: string | undefined;
            groupId?: string | undefined;
        };
        viewerState?: unknown;
    }[];
}, {
    rooms: {
        room: {
            id: string;
            name: string;
            kind: string;
            description?: string | undefined;
            archived?: boolean | undefined;
            groupId?: string | undefined;
            universal?: boolean | undefined;
        };
        viewerState?: unknown;
    }[];
}>;
export declare const GetRoomResponseSchema: z.ZodObject<{
    room: z.ZodObject<{
        room: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            kind: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            archived: z.ZodDefault<z.ZodBoolean>;
            groupId: z.ZodOptional<z.ZodString>;
            universal: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            kind: string;
            archived: boolean;
            universal: boolean;
            description?: string | undefined;
            groupId?: string | undefined;
        }, {
            id: string;
            name: string;
            kind: string;
            description?: string | undefined;
            archived?: boolean | undefined;
            groupId?: string | undefined;
            universal?: boolean | undefined;
        }>;
        viewerState: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        room: {
            id: string;
            name: string;
            kind: string;
            archived: boolean;
            universal: boolean;
            description?: string | undefined;
            groupId?: string | undefined;
        };
        viewerState?: unknown;
    }, {
        room: {
            id: string;
            name: string;
            kind: string;
            description?: string | undefined;
            archived?: boolean | undefined;
            groupId?: string | undefined;
            universal?: boolean | undefined;
        };
        viewerState?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    room: {
        room: {
            id: string;
            name: string;
            kind: string;
            archived: boolean;
            universal: boolean;
            description?: string | undefined;
            groupId?: string | undefined;
        };
        viewerState?: unknown;
    };
}, {
    room: {
        room: {
            id: string;
            name: string;
            kind: string;
            description?: string | undefined;
            archived?: boolean | undefined;
            groupId?: string | undefined;
            universal?: boolean | undefined;
        };
        viewerState?: unknown;
    };
}>;
export declare const GetRoomEventsResponseSchema: z.ZodObject<{
    page: z.ZodObject<{
        events: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            createdAt: z.ZodString;
            actorId: z.ZodString;
            messagePosted: z.ZodOptional<z.ZodObject<{
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
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: string;
            actorId: string;
            messagePosted?: {
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
            } | undefined;
        }, {
            id: string;
            createdAt: string;
            actorId: string;
            messagePosted?: {
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
            } | undefined;
        }>, "many">;
        startCursor: z.ZodOptional<z.ZodString>;
        endCursor: z.ZodOptional<z.ZodString>;
        hasOlder: z.ZodDefault<z.ZodBoolean>;
        hasNewer: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        events: {
            id: string;
            createdAt: string;
            actorId: string;
            messagePosted?: {
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
            } | undefined;
        }[];
        hasOlder: boolean;
        hasNewer: boolean;
        startCursor?: string | undefined;
        endCursor?: string | undefined;
    }, {
        events: {
            id: string;
            createdAt: string;
            actorId: string;
            messagePosted?: {
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
            } | undefined;
        }[];
        startCursor?: string | undefined;
        endCursor?: string | undefined;
        hasOlder?: boolean | undefined;
        hasNewer?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    page: {
        events: {
            id: string;
            createdAt: string;
            actorId: string;
            messagePosted?: {
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
            } | undefined;
        }[];
        hasOlder: boolean;
        hasNewer: boolean;
        startCursor?: string | undefined;
        endCursor?: string | undefined;
    };
}, {
    page: {
        events: {
            id: string;
            createdAt: string;
            actorId: string;
            messagePosted?: {
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
            } | undefined;
        }[];
        startCursor?: string | undefined;
        endCursor?: string | undefined;
        hasOlder?: boolean | undefined;
        hasNewer?: boolean | undefined;
    };
}>;
//# sourceMappingURL=room.d.ts.map