import { DomNode } from "@hanul/skynode";
export default class TypingText extends DomNode {
    private text;
    private callback?;
    private interval;
    private current;
    constructor(text: string, callback?: (() => void) | undefined);
    private typing;
    delete(): void;
}
//# sourceMappingURL=TypingText.d.ts.map