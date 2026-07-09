import type { RestClient } from '../rest/client';
import { User } from '../resources/user';
export declare class UserManager {
    private readonly rest;
    constructor(rest: RestClient);
    fetch(userId: string): Promise<User>;
    batchFetch(userIds: string[]): Promise<User[]>;
    list(opts?: {
        search?: string;
    }): Promise<User[]>;
}
//# sourceMappingURL=users.d.ts.map