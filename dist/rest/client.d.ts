import type { z, ZodTypeAny } from 'zod';
export declare class RestClient {
    private readonly baseUrl;
    private readonly token;
    constructor(baseUrl: string, token: string);
    post<S extends ZodTypeAny>(service: string, method: string, input: unknown, schema: S): Promise<z.output<S>>;
}
//# sourceMappingURL=client.d.ts.map