import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import Alert from "../component/Alert";
import Selectable from "../component/Selectable";
import TypingText from "../component/TypingText";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;

    constructor() {
        Layout.current.content.append(this.container = el(".home-view",
            new TypingText(`Facts by AI
AI가 현장의 감시카메라 데이터를 통해 증언을 합니다.
증언을 위한 케이스를 보유하고 있어야 하며, 증인은 여러 번 재시도 할 수 있습니다. 
마음에 드는 증언이 출력되면 민팅할 수 있으며, 민팅에는 10MIX가 소모됩니다.
어떤 케이스를 선택하시겠습니까?`, () => {
                new Selectable([{
                    name: "샘플 케이스",
                    callback: () => SkyRouter.go("/samplecase"),
                }, {
                    name: "나의 케이스",
                    //callback: () => SkyRouter.go("/mycase"),
                    callback: () => new Alert("나의 케이스는 개발중입니다."),
                }]).appendTo(this.container);
            }),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
