import { DomNode, el, Popup } from "@hanul/skynode";
import Selectable from "./Selectable";
import TypingText from "./TypingText";

export default class Alert extends Popup {

    public content: DomNode;

    constructor(message: string) {
        super(".popup-background");

        let main: DomNode;
        this.append(
            this.content = el(".popup.alert",
                main = el("main",
                    new TypingText(message, () => {
                        new Selectable([{
                            name: "닫기",
                            callback: () => this.delete(),
                        }]).appendTo(main);
                    }),
                ),
            ),
        );
    }
}
