import { DomNode, el, Popup } from "@hanul/skynode";
import Selectable from "./Selectable";
import TypingText from "./TypingText";

export default class NotEnoughMixPopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");

        let main: DomNode;
        this.append(
            this.content = el(".popup.not-enough-mix-popup",
                main = el("main",
                    new TypingText("1 MIX가 필요합니다. 클레이스왑에서 구매하시겠습니까?", () => {
                        new Selectable([{
                            name: "예",
                            callback: () => open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf"),
                        }, {
                            name: "아니오",
                            callback: () => this.delete(),
                        }]).appendTo(main);
                    }),
                ),
            ),
        );
    }
}
