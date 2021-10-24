import { BodyNode, DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;
        BodyNode.append(this.container = el(".layout",
            this.content = el(".content"),
            el("footer", "Cases By Kate X AI Network"),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public scrollToBottom() {
        this.content.domElement.scrollTo(0, 999999);
    }

    public close(): void {
        this.container.delete();
    }
}
