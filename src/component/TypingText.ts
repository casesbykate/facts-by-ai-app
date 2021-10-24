import { DomNode } from "@hanul/skynode";
import Layout from "../view/Layout";

export default class TypingText extends DomNode {

    private interval: number | undefined;
    private current = 0;

    constructor(private text: string, private callback?: () => void) {
        super("p.typing-text");
        //this.interval = setInterval(() => this.typing(), 20) as any;
        this.interval = setInterval(() => this.typing(), 0) as any;
    }

    private typing() {
        if (this.current >= this.text.length) {
            clearInterval(this.interval);
            this.interval = undefined;
            if (this.deleted !== true && this.callback !== undefined) {
                this.callback();
            }
        } else {
            this.appendText(this.text[this.current]);
            this.current += 1;
            Layout.current.scrollToBottom();
        }
    }

    public delete() {
        if (this.interval !== undefined) {
            clearInterval(this.interval);
        }
        super.delete();
    }
}
