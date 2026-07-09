"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const user_1 = require("../resources/user");
const user_2 = require("../schemas/user");
class UserManager {
    rest;
    constructor(rest) {
        this.rest = rest;
    }
    async fetch(userId) {
        const res = await this.rest.post('chatto.api.v1.UserService', 'GetUser', { userId }, user_2.GetUserResponseSchema);
        return new user_1.User(res.user);
    }
    async batchFetch(userIds) {
        const res = await this.rest.post('chatto.api.v1.UserService', 'BatchGetUsers', { userIds }, user_2.BatchGetUsersResponseSchema);
        return res.users.map(m => new user_1.User(m));
    }
    async list(opts = {}) {
        const res = await this.rest.post('chatto.api.v1.UserService', 'ListUsers', { search: opts.search }, user_2.ListUsersResponseSchema);
        return res.users.map(m => new user_1.User(m));
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=users.js.map