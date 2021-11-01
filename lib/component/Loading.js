"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
class Loading extends skynode_1.DomNode {
    constructor() {
        super(".loading");
        let loadingText;
        let dotCount = 0;
        this.append((0, skynode_1.el)("img", { src: "/images/loading.png", height: "30" }), loadingText = (0, skynode_1.el)("span", "Loading"));
        this.interval = setInterval(() => {
            let dots = "";
            dotCount += 1;
            if (dotCount > 3) {
                dotCount = 0;
            }
            skyutil_1.default.repeat(dotCount, () => {
                dots += ".";
            });
            loadingText.empty().appendText(`Loading${dots}`);
        }, 500);
    }
    delete() {
        clearInterval(this.interval);
        super.delete();
    }
}
exports.default = Loading;
//# sourceMappingURL=Loading.js.map