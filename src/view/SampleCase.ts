import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import superagent from "superagent";
import Alert from "../component/Alert";
import Loading from "../component/Loading";
import Selectable from "../component/Selectable";
import TypingText from "../component/TypingText";
import Layout from "./Layout";

export default class SampleCase implements View {

    private container: DomNode;

    constructor() {
        Layout.current.content.append(this.container = el(".samplecase-view",
            new TypingText("샘플 케이스를 선택하였습니다.", () => {
                this.container.append(
                    el("img.case", { src: "https://storage.googleapis.com/cbk-nft/v2/1.png", height: "400" }),
                );
                this.generate();
            }),
        ));
    }

    private generate() {

        this.container.append(
            new TypingText("새로운 증언을 열람하시겠습니까?", () => {
                new Selectable([{
                    name: "예",
                    callback: () => {

                        let now = new Date();
                        this.container.append(
                            new TypingText(`${now.getHours()}시 ${now.getMinutes()}분 등록된 새로운 증언을 조회합니다.\n\n`, async () => {

                                const loading = new Loading().appendTo(this.container);
                                const result = await superagent.get("https://api.casesbykate.xyz/factsbyai-generate/1");
                                loading.delete();

                                this.container.append(
                                    new TypingText(result.text, () => {

                                        this.container.append(
                                            new TypingText("\n새로운 증언을 민팅하시겠습니까?", () => {
                                                new Selectable([{
                                                    name: "예(1MIX 소모)",
                                                    callback: () => new Alert("샘플 케이스의 경우에는 민팅이 불가능합니다."),
                                                }, {
                                                    name: "아니오",
                                                    callback: () => this.generate(),
                                                }]).appendTo(this.container);
                                            }),
                                        );
                                    }),
                                );
                            }),
                        );
                    },
                }, {
                    name: "아니오",
                    callback: () => SkyRouter.go("/"),
                }]).appendTo(this.container);
            }),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
