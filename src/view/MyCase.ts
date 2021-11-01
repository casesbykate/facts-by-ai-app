import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { SkyRouter, View, ViewParams } from "skyrouter";
import superagent from "superagent";
import Alert from "../component/Alert";
import Loading from "../component/Loading";
import NotEnoughMixPopup from "../component/NotEnoughMixPopup";
import Selectable from "../component/Selectable";
import SelectCasePopup from "../component/SelectCasePopup";
import TypingText from "../component/TypingText";
import FactsContract from "../contracts/FactsContract";
import MixContract from "../contracts/MixContract";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";

export default class MyCase implements View {

    private container: DomNode;

    constructor() {
        Layout.current.content.append(this.container = el(".mycase-view",
            new TypingText(`나의 케이스를 선택하였습니다.

            지갑을 연결합니다…`, async () => {
                if (await Wallet.connected() !== true) {
                    await Wallet.connect();
                }
                new Selectable([{
                    name: "케이스 선택하기",
                    callback: () => new SelectCasePopup((selected) => {
                        this.generate(selected);
                    }),
                }, {
                    name: "돌아가기",
                    callback: () => SkyRouter.go("/"),
                }]).appendTo(this.container);
            }),
        ));
    }

    private generate(selected: number) {

        this.container.append(
            new TypingText("새로운 증언을 열람하시겠습니까?", () => {
                new Selectable([{
                    name: "예",
                    callback: () => {

                        let now = new Date();
                        this.container.append(
                            new TypingText(`${now.getHours()}시 ${now.getMinutes()}분 등록된 새로운 증언을 조회합니다.\n\n`, async () => {

                                const loading = new Loading().appendTo(this.container);
                                const result = await superagent.get(`https://api.casesbykate.xyz/factsbyai-generate/${selected}`);
                                loading.delete();

                                this.container.append(
                                    new TypingText(result.text, () => {

                                        this.container.append(
                                            new TypingText("\n새로운 증언을 민팅하시겠습니까?", () => {
                                                new Selectable([{
                                                    name: "예(1MIX 소모)",
                                                    callback: async () => {

                                                        if (await Wallet.connected() !== true) {
                                                            await Wallet.connect();
                                                        }
                                                        const owner = await Wallet.loadAddress();
                                                        if (owner !== undefined) {
                                                            const mixNeeded = utils.parseEther("1");

                                                            const mint = async () => {
                                                                if (result.text !== null && result.text !== undefined && result.text !== "") {
                                                                    await FactsContract.mint(selected, result.text);
                                                                    setTimeout(() => {
                                                                        open(`https://opensea.io/assets/klaytn/${FactsContract.address}/${selected}`);
                                                                        new Alert("민팅이 완료되었습니다.");

                                                                        new Selectable([{
                                                                            name: "케이스 선택하기",
                                                                            callback: () => new SelectCasePopup((selected) => {
                                                                                this.generate(selected);
                                                                            }),
                                                                        }, {
                                                                            name: "돌아가기",
                                                                            callback: () => SkyRouter.go("/"),
                                                                        }]).appendTo(this.container);
                                                                    }, 2000);
                                                                }
                                                            };

                                                            const balance = await MixContract.balanceOf(owner);
                                                            if (balance.lt(mixNeeded)) {
                                                                new NotEnoughMixPopup();
                                                            }

                                                            else if ((await MixContract.allowance(owner, FactsContract.address)).lt(mixNeeded)) {
                                                                await MixContract.approve(FactsContract.address, mixNeeded);
                                                                setTimeout(() => {
                                                                    mint();
                                                                }, 2000);
                                                            }

                                                            else {
                                                                mint();
                                                            }
                                                        }
                                                    },
                                                }, {
                                                    name: "아니오",
                                                    callback: () => this.generate(selected),
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
