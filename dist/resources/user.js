"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialUser = exports.User = void 0;
const user_1 = require("../schemas/user");
class User {
    id;
    login;
    displayName;
    deleted;
    avatarUrl;
    presenceStatus;
    customStatus;
    roles;
    createdAt;
    constructor(data) {
        this.id = data.user.id;
        this.login = data.user.login;
        this.displayName = data.user.displayName;
        this.deleted = data.user.deleted;
        this.avatarUrl = data.user.avatarUrl;
        this.presenceStatus = data.user.presenceStatus;
        this.customStatus = data.user.customStatus;
        this.roles = data.roles;
        this.createdAt = data.createdAt;
    }
}
exports.User = User;
class PartialUser {
    rest;
    id;
    constructor(id, rest) {
        this.rest = rest;
        this.id = id;
    }
    async fetch() {
        const res = await this.rest.post('chatto.api.v1.UserService', 'GetUser', { userId: this.id }, user_1.GetUserResponseSchema);
        return new User(res.user);
    }
}
exports.PartialUser = PartialUser;
//# sourceMappingURL=user.js.map