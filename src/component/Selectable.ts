import { DomNode, el } from "@hanul/skynode";

export default class Selectable extends DomNode {

    private focused = 0;
    private optionNodes: DomNode[] = [];
    private focusedOptionNode: DomNode | undefined;

    constructor(private options: {
        name: string,
        callback: () => any,
    }[]) {
        super(".selectable");
        for (const option of options) {
            let optionNode;
            this.append(el(".option-container",
                optionNode = el("a.option", `> ${option.name}`, {
                    click: () => {
                        const result = option.callback();
                        if (result !== undefined) {
                            window.removeEventListener("keydown", this.keydownHandler);
                        }
                    },
                }),
            ));
            this.optionNodes.push(optionNode);
        }
        this.focus(this.focused);
        window.addEventListener("keydown", this.keydownHandler);
    }

    private focus(index: number) {
        const optionNode = this.optionNodes[index];
        if (optionNode !== undefined) {
            this.focusedOptionNode?.deleteClass("active");
            this.focusedOptionNode = optionNode;
            optionNode.addClass("active");
        }
        this.focused = index;
    }

    private keydownHandler = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            this.focus(this.focused > 0 ? this.focused - 1 : this.optionNodes.length - 1);
            event.preventDefault();
        } else if (event.key === "ArrowDown") {
            this.focus(this.focused < this.optionNodes.length - 1 ? this.focused + 1 : 0);
            event.preventDefault();
        } else if (event.key === "Enter") {
            this.options[this.focused].callback();
            window.removeEventListener("keydown", this.keydownHandler);
            event.preventDefault();
        }
    };

    public delete() {
        window.removeEventListener("keydown", this.keydownHandler);
        super.delete();
    }
}
