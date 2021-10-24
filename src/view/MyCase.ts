import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import TypingText from "../component/TypingText";
import Layout from "./Layout";

export default class MyCase implements View {

    private container: DomNode;

    constructor() {
        Layout.current.content.append(this.container = el(".mycase-view",
            new TypingText(`나의 케이스를 선택하였습니다.

            지갑을 연결합니다…`, () => {
            }),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
