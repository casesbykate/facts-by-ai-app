import { DomNode, el, Popup } from "@hanul/skynode";
import SkyUtil from "skyutil";
import FactsContract from "../contracts/FactsContract";
import NFTContract from "../contracts/NFTContract";
import Wallet from "../klaytn/Wallet";
import Selectable from "./Selectable";
import TypingText from "./TypingText";

export default class SelectCasePopup extends Popup {

    public content: DomNode;
    private caseList: DomNode;
    private selected: number | undefined;

    constructor(callback: (selected: number) => void) {
        super(".popup-background");

        let main: DomNode;
        this.append(
            this.content = el(".popup.select-case-popup",
                main = el("main",
                    new TypingText("케이스를 선택해주세요."),
                    this.caseList = el(".case-list"),
                    new TypingText("\n선택된 케이스로 실행하시겠습니까?", async () => {
                        new Selectable([{
                            name: "예",
                            callback: () => {
                                if (this.selected !== undefined) {
                                    callback(this.selected);
                                    this.delete();
                                }
                            },
                        }, {
                            name: "아니오",
                            callback: () => {
                                this.delete();
                            },
                        }]).appendTo(main);
                    }),
                ),
            ),
        );
        this.load();
    }

    private async load() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const balance = await NFTContract.balanceOf(owner);

            let selectedCase: DomNode | undefined;
            SkyUtil.repeatResultAsync(balance.toNumber(), async (index) => {
                const tokenId = await NFTContract.tokenOfOwnerByIndex(owner, index);
                if (await FactsContract.exists(tokenId) !== true) {
                    let _case: DomNode;
                    this.caseList.append(_case = el("a.case",
                        el("img", { src: `https://storage.googleapis.com/cbk-nft/v2/${tokenId}.png`, height: "300" }),
                        {
                            click: () => {
                                this.selected = tokenId.toNumber();
                                selectedCase?.deleteClass("selected");
                                selectedCase = _case;
                                selectedCase.addClass("selected");
                            },
                        },
                    ));
                }
            });
        }
    }
}
