import { z } from 'zod';
export declare const PresenceStatusSchema: z.ZodEnum<["PRESENCE_STATUS_UNSPECIFIED", "PRESENCE_STATUS_ONLINE", "PRESENCE_STATUS_AWAY", "PRESENCE_STATUS_DO_NOT_DISTURB", "PRESENCE_STATUS_OFFLINE"]>;
export declare const CustomUserStatusSchema: z.ZodObject<{
    emoji: z.ZodString;
    text: z.ZodString;
    expiresAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    emoji: string;
    text: string;
    expiresAt?: string | undefined;
}, {
    emoji: string;
    text: string;
    expiresAt?: string | undefined;
}>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    login: z.ZodString;
    displayName: z.ZodString;
    deleted: z.ZodDefault<z.ZodBoolean>;
    avatarUrl: z.ZodOptional<z.ZodString>;
    presenceStatus: z.ZodEnum<["PRESENCE_STATUS_UNSPECIFIED", "PRESENCE_STATUS_ONLINE", "PRESENCE_STATUS_AWAY", "PRESENCE_STATUS_DO_NOT_DISTURB", "PRESENCE_STATUS_OFFLINE"]>;
    customStatus: z.ZodOptional<z.ZodObject<{
        emoji: z.ZodString;
        text: z.ZodString;
        expiresAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        emoji: string;
        text: string;
        expiresAt?: string | undefined;
    }, {
        emoji: string;
        text: string;
        expiresAt?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    deleted: boolean;
    login: string;
    displayName: string;
    presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
    avatarUrl?: string | undefined;
    customStatus?: {
        emoji: string;
        text: string;
        expiresAt?: string | undefined;
    } | undefined;
}, {
    id: string;
    login: string;
    displayName: string;
    presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
    deleted?: boolean | undefined;
    avatarUrl?: string | undefined;
    customStatus?: {
        emoji: string;
        text: string;
        expiresAt?: string | undefined;
    } | undefined;
}>;
export declare const DirectoryMemberSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodString;
        login: z.ZodString;
        displayName: z.ZodString;
        deleted: z.ZodDefault<z.ZodBoolean>;
        avatarUrl: z.ZodOptional<z.ZodString>;
        presenceStatus: z.ZodEnum<["PRESENCE_STATUS_UNSPECIFIED", "PRESENCE_STATUS_ONLINE", "PRESENCE_STATUS_AWAY", "PRESENCE_STATUS_DO_NOT_DISTURB", "PRESENCE_STATUS_OFFLINE"]>;
        customStatus: z.ZodOptional<z.ZodObject<{
            emoji: z.ZodString;
            text: z.ZodString;
            expiresAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            emoji: string;
            text: string;
            expiresAt?: string | undefined;
        }, {
            emoji: string;
            text: string;
            expiresAt?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        deleted: boolean;
        login: string;
        displayName: string;
        presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
        avatarUrl?: string | undefined;
        customStatus?: {
            emoji: string;
            text: string;
            expiresAt?: string | undefined;
        } | undefined;
    }, {
        id: string;
        login: string;
        displayName: string;
        presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
        deleted?: boolean | undefined;
        avatarUrl?: string | undefined;
        customStatus?: {
            emoji: string;
            text: string;
            expiresAt?: string | undefined;
        } | undefined;
    }>;
    roles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    user: {
        id: string;
        deleted: boolean;
        login: string;
        displayName: string;
        presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
        avatarUrl?: string | undefined;
        customStatus?: {
            emoji: string;
            text: string;
            expiresAt?: string | undefined;
        } | undefined;
    };
    roles: string[];
    createdAt?: string | undefined;
}, {
    user: {
        id: string;
        login: string;
        displayName: string;
        presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
        deleted?: boolean | undefined;
        avatarUrl?: string | undefined;
        customStatus?: {
            emoji: string;
            text: string;
            expiresAt?: string | undefined;
        } | undefined;
    };
    createdAt?: string | undefined;
    roles?: string[] | undefined;
}>;
export declare const GetUserResponseSchema: z.ZodObject<{
    user: z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            login: z.ZodString;
            displayName: z.ZodString;
            deleted: z.ZodDefault<z.ZodBoolean>;
            avatarUrl: z.ZodOptional<z.ZodString>;
            presenceStatus: z.ZodEnum<["PRESENCE_STATUS_UNSPECIFIED", "PRESENCE_STATUS_ONLINE", "PRESENCE_STATUS_AWAY", "PRESENCE_STATUS_DO_NOT_DISTURB", "PRESENCE_STATUS_OFFLINE"]>;
            customStatus: z.ZodOptional<z.ZodObject<{
                emoji: z.ZodString;
                text: z.ZodString;
                expiresAt: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            }, {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            deleted: boolean;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        }, {
            id: string;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            deleted?: boolean | undefined;
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        }>;
        roles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        user: {
            id: string;
            deleted: boolean;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        roles: string[];
        createdAt?: string | undefined;
    }, {
        user: {
            id: string;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            deleted?: boolean | undefined;
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        createdAt?: string | undefined;
        roles?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    user: {
        user: {
            id: string;
            deleted: boolean;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        roles: string[];
        createdAt?: string | undefined;
    };
}, {
    user: {
        user: {
            id: string;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            deleted?: boolean | undefined;
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        createdAt?: string | undefined;
        roles?: string[] | undefined;
    };
}>;
export declare const BatchGetUsersResponseSchema: z.ZodObject<{
    users: z.ZodArray<z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            login: z.ZodString;
            displayName: z.ZodString;
            deleted: z.ZodDefault<z.ZodBoolean>;
            avatarUrl: z.ZodOptional<z.ZodString>;
            presenceStatus: z.ZodEnum<["PRESENCE_STATUS_UNSPECIFIED", "PRESENCE_STATUS_ONLINE", "PRESENCE_STATUS_AWAY", "PRESENCE_STATUS_DO_NOT_DISTURB", "PRESENCE_STATUS_OFFLINE"]>;
            customStatus: z.ZodOptional<z.ZodObject<{
                emoji: z.ZodString;
                text: z.ZodString;
                expiresAt: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            }, {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            deleted: boolean;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        }, {
            id: string;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            deleted?: boolean | undefined;
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        }>;
        roles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        user: {
            id: string;
            deleted: boolean;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        roles: string[];
        createdAt?: string | undefined;
    }, {
        user: {
            id: string;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            deleted?: boolean | undefined;
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        createdAt?: string | undefined;
        roles?: string[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    users: {
        user: {
            id: string;
            deleted: boolean;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        roles: string[];
        createdAt?: string | undefined;
    }[];
}, {
    users: {
        user: {
            id: string;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            deleted?: boolean | undefined;
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        createdAt?: string | undefined;
        roles?: string[] | undefined;
    }[];
}>;
export declare const ListUsersResponseSchema: z.ZodObject<{
    users: z.ZodArray<z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            login: z.ZodString;
            displayName: z.ZodString;
            deleted: z.ZodDefault<z.ZodBoolean>;
            avatarUrl: z.ZodOptional<z.ZodString>;
            presenceStatus: z.ZodEnum<["PRESENCE_STATUS_UNSPECIFIED", "PRESENCE_STATUS_ONLINE", "PRESENCE_STATUS_AWAY", "PRESENCE_STATUS_DO_NOT_DISTURB", "PRESENCE_STATUS_OFFLINE"]>;
            customStatus: z.ZodOptional<z.ZodObject<{
                emoji: z.ZodString;
                text: z.ZodString;
                expiresAt: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            }, {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            deleted: boolean;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        }, {
            id: string;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            deleted?: boolean | undefined;
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        }>;
        roles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        user: {
            id: string;
            deleted: boolean;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        roles: string[];
        createdAt?: string | undefined;
    }, {
        user: {
            id: string;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            deleted?: boolean | undefined;
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        createdAt?: string | undefined;
        roles?: string[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    users: {
        user: {
            id: string;
            deleted: boolean;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        roles: string[];
        createdAt?: string | undefined;
    }[];
}, {
    users: {
        user: {
            id: string;
            login: string;
            displayName: string;
            presenceStatus: "PRESENCE_STATUS_UNSPECIFIED" | "PRESENCE_STATUS_ONLINE" | "PRESENCE_STATUS_AWAY" | "PRESENCE_STATUS_DO_NOT_DISTURB" | "PRESENCE_STATUS_OFFLINE";
            deleted?: boolean | undefined;
            avatarUrl?: string | undefined;
            customStatus?: {
                emoji: string;
                text: string;
                expiresAt?: string | undefined;
            } | undefined;
        };
        createdAt?: string | undefined;
        roles?: string[] | undefined;
    }[];
}>;
//# sourceMappingURL=user.d.ts.map