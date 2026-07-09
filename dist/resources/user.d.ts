import type { DirectoryMemberData } from '../types';
import type { RestClient } from '../rest/client';
export declare class User {
    readonly id: string;
    readonly login: string;
    readonly displayName: string;
    readonly deleted: boolean;
    readonly avatarUrl: string | undefined;
    readonly presenceStatus: string;
    readonly customStatus: {
        emoji: string;
        text: string;
        expiresAt?: string;
    } | undefined;
    readonly roles: string[];
    readonly createdAt: string | undefined;
    constructor(data: DirectoryMemberData);
}
export declare class PartialUser {
    private readonly rest;
    readonly id: string;
    constructor(id: string, rest: RestClient);
    fetch(): Promise<User>;
}
//# sourceMappingURL=user.d.ts.map