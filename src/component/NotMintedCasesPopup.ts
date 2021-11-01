import { DomNode, el, Popup } from "@hanul/skynode";
import FactsContract from "../contracts/FactsContract";
import Selectable from "./Selectable";
import TypingText from "./TypingText";

export default class NotMintedCasesPopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");

        let main: DomNode;
        this.append(
            this.content = el(".popup.not-minted-cases-popup",
                main = el("main",
                    new TypingText("사실 확인이 되지 않은 케이스\n\n케이스 번호를 입력하세요.\n", () => {
                        let input: DomNode<HTMLInputElement>;
                        el("form",
                            input = el("input"),
                            el("input", { type: "submit", value: "검색" }),
                            {
                                submit: (e: SubmitEvent) => {
                                    const id = parseInt(input.domElement.value, 10);
                                    if (isNaN(id) !== true) {
                                        new TypingText("조회 중입니다...\n\n", async () => {
                                            if (await FactsContract.exists(id) !== true) {
                                                new TypingText(`케이스 #${id} 번은 민팅 가능합니다.\n\n`).appendTo(main);
                                            } else {
                                                new TypingText(`케이스 #${id} 번은 이미 민팅되었습니다.\n\n`).appendTo(main);
                                            }
                                            new Selectable([{
                                                name: "다른 케이스 검색",
                                                callback: () => {
                                                    this.delete();
                                                    new NotMintedCasesPopup();
                                                },
                                            }, {
                                                name: "닫기",
                                                callback: () => this.delete(),
                                            }]).appendTo(main);
                                        }).appendTo(main);
                                    }
                                    e.preventDefault();
                                },
                            },
                        ).appendTo(main);
                        input.domElement.select();
                    }),
                ),
            ),
        );
    }
}
