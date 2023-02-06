import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import Alert from "../component/Alert";
import NotMintedCasesPopup from "../component/NotMintedCasesPopup";
import Selectable from "../component/Selectable";
import TypingText from "../component/TypingText";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;

    constructor() {
        Layout.current.content.append(this.container = el(".home-view",
            new TypingText(`Facts by AI

제너레이티브 NFT와 AI의 만남.
Facts By AI 발행은 종료되었습니다.
관련 코드는 공개, 라이센스 오픈되어 있으며,
궁금한 점은 디스코드 커뮤니티를 찾아주세요.`, () => {
                new Selectable([{
                    name: "케이스바이케이트 홈페이지 메인으로 이동",
                    callback: () => open("https://www.casesbykate.xyz/"),
                }]).appendTo(this.container);
            }),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
