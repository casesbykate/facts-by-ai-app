"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Selectable extends skynode_1.DomNode {
    constructor(options) {
        super(".selectable");
        this.options = options;
        this.focused = 0;
        this.optionNodes = [];
        this.keydownHandler = (event) => {
            if (event.key === "ArrowUp") {
                this.focus(this.focused > 0 ? this.focused - 1 : this.optionNodes.length - 1);
                event.preventDefault();
            }
            else if (event.key === "ArrowDown") {
                this.focus(this.focused < this.optionNodes.length - 1 ? this.focused + 1 : 0);
                event.preventDefault();
            }
            else if (event.key === "Enter") {
                this.options[this.focused].callback();
                window.removeEventListener("keydown", this.keydownHandler);
                event.preventDefault();
            }
        };
        for (const option of options) {
            let optionNode;
            this.append((0, skynode_1.el)(".option-container", optionNode = (0, skynode_1.el)("a.option", `> ${option.name}`, {
                click: () => {
                    option.callback();
                    window.removeEventListener("keydown", this.keydownHandler);
                },
            })));
            this.optionNodes.push(optionNode);
        }
        this.focus(this.focused);
        window.addEventListener("keydown", this.keydownHandler);
    }
    focus(index) {
        const optionNode = this.optionNodes[index];
        if (optionNode !== undefined) {
            this.focusedOptionNode?.deleteClass("active");
            this.focusedOptionNode = optionNode;
            optionNode.addClass("active");
        }
        this.focused = index;
    }
    delete() {
        window.removeEventListener("keydown", this.keydownHandler);
        super.delete();
    }
}
exports.default = Selectable;
//# sourceMappingURL=Selectable.js.map