import { DomNode, el, Popup } from "@hanul/skynode";
import Selectable from "./Selectable";
import TypingText from "./TypingText";

export default class Alert extends Popup {

    public content: DomNode;

    constructor(message: string) {
        super(".popup-background");
        this.append(
            this.content = el(".popup.alert",
                new TypingText(message, () => {
                    new Selectable([{
                        name: "닫기",
                        callback: () => this.delete(),
                    }]).appendTo(this.content);
                }),
            ),
        );
    }
}
