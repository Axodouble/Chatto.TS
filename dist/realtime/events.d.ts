import type { ServerFrame } from './frames';
import type { MessageDeleteEvent, ReactionEvent } from '../types';
export type SdkEvent = {
    kind: 'messageCreate';
    roomId: string;
    messageEventId: string;
} | {
    kind: 'messageUpdate';
    roomId: string;
    messageEventId: string;
} | {
    kind: 'messageDelete';
    event: MessageDeleteEvent;
} | {
    kind: 'reactionAdd';
    event: ReactionEvent;
} | {
    kind: 'reactionRemove';
    event: ReactionEvent;
};
export declare function mapFrameToEvent(frame: ServerFrame): SdkEvent | null;
//# sourceMappingURL=events.d.ts.map