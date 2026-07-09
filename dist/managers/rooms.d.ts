import type { RestClient } from '../rest/client';
import { Room } from '../resources/room';
export declare class RoomManager {
    private readonly rest;
    constructor(rest: RestClient);
    list(): Promise<Room[]>;
    fetch(roomId: string): Promise<Room>;
}
//# sourceMappingURL=rooms.d.ts.map