import type { ZodIssue } from 'zod';
export declare class ChattoApiError extends Error {
    readonly code: string;
    readonly rawResponse: unknown;
    constructor(code: string, message: string, rawResponse: unknown);
}
export declare class ChattoParseError extends Error {
    readonly issues: ZodIssue[];
    readonly rawBody: unknown;
    constructor(issues: ZodIssue[], rawBody: unknown);
}
//# sourceMappingURL=errors.d.ts.map