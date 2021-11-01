import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";

export default class Loading extends DomNode {

    private interval: number;

    constructor() {
        super(".loading");

        let loadingText: DomNode;
        let dotCount = 0;

        this.append(
            el("img", { src: "/images/loading.png", height: "30" }),
            loadingText = el("span", "Loading"),
        );

        this.interval = setInterval(() => {
            let dots = "";
            dotCount += 1;
            if (dotCount > 3) {
                dotCount = 0;
            }
            SkyUtil.repeat(dotCount, () => {
                dots += ".";
            });
            loadingText.empty().appendText(`Loading${dots}`);
        }, 500) as any;
    }

    public delete() {
        clearInterval(this.interval);
        super.delete();
    }
}
