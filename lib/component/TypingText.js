"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../view/Layout"));
class TypingText extends skynode_1.DomNode {
    constructor(text, callback) {
        super("p.typing-text");
        this.text = text;
        this.callback = callback;
        this.current = 0;
        this.interval = setInterval(() => this.typing(), 20);
    }
    typing() {
        if (this.current >= this.text.length) {
            clearInterval(this.interval);
            this.interval = undefined;
            if (this.deleted !== true && this.callback !== undefined) {
                this.callback();
            }
        }
        else {
            this.appendText(this.text[this.current]);
            this.current += 1;
            Layout_1.default.current.scrollToBottom();
        }
    }
    delete() {
        if (this.interval !== undefined) {
            clearInterval(this.interval);
        }
        super.delete();
    }
}
exports.default = TypingText;
//# sourceMappingURL=TypingText.js.map