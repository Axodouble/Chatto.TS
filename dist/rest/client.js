"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClient = void 0;
const errors_1 = require("../errors");
class RestClient {
    baseUrl;
    token;
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token;
    }
    async post(service, method, input, schema) {
        const url = `${this.baseUrl}/api/connect/${service}/${method}`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Connect-Protocol-Version': '1',
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(input),
        });
        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new errors_1.ChattoApiError(typeof body['code'] === 'string' ? body['code'] : 'unknown', typeof body['message'] === 'string' ? body['message'] : res.statusText, body);
        }
        const body = await res.json();
        const parsed = schema.safeParse(body);
        if (!parsed.success) {
            throw new errors_1.ChattoParseError(parsed.error.issues, body);
        }
        return parsed.data;
    }
}
exports.RestClient = RestClient;
//# sourceMappingURL=client.js.map