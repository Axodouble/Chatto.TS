"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChattoParseError = exports.ChattoApiError = void 0;
class ChattoApiError extends Error {
    code;
    rawResponse;
    constructor(code, message, rawResponse) {
        super(message);
        this.code = code;
        this.rawResponse = rawResponse;
        this.name = 'ChattoApiError';
    }
}
exports.ChattoApiError = ChattoApiError;
class ChattoParseError extends Error {
    issues;
    rawBody;
    constructor(issues, rawBody) {
        super(`Failed to parse API response: ${issues.map(i => i.message).join(', ')}`);
        this.issues = issues;
        this.rawBody = rawBody;
        this.name = 'ChattoParseError';
    }
}
exports.ChattoParseError = ChattoParseError;
//# sourceMappingURL=errors.js.map