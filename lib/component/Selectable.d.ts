import { DomNode } from "@hanul/skynode";
export default class Selectable extends DomNode {
    private options;
    private focused;
    private optionNodes;
    private focusedOptionNode;
    constructor(options: {
        name: string;
        callback: () => void;
    }[]);
    private focus;
    private keydownHandler;
    delete(): void;
}
//# sourceMappingURL=Selectable.d.ts.map