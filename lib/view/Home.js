"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const NotMintedCasesPopup_1 = __importDefault(require("../component/NotMintedCasesPopup"));
const Selectable_1 = __importDefault(require("../component/Selectable"));
const TypingText_1 = __importDefault(require("../component/TypingText"));
const Layout_1 = __importDefault(require("./Layout"));
class Home {
    constructor() {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".home-view", new TypingText_1.default(`Facts by AI

AI가 현장의 감시카메라 데이터를 통해 증언을 합니다.
증언을 위한 케이스를 보유하고 있어야 하며, 증인은 여러 번 재시도 할 수 있습니다. 
마음에 드는 증언이 출력되면 민팅할 수 있으며, 민팅에는 1MIX가 소모됩니다.
어떤 케이스를 선택하시겠습니까?`, () => {
            new Selectable_1.default([{
                    name: "샘플 케이스",
                    callback: () => skyrouter_1.SkyRouter.go("/samplecase"),
                }, {
                    name: "나의 케이스",
                    callback: () => skyrouter_1.SkyRouter.go("/mycase"),
                }, {
                    name: "미제 사건(케이스) 목록 조회",
                    callback: () => new NotMintedCasesPopup_1.default(),
                }, {
                    name: "케이스 구매",
                    callback: () => open("https://opensea.io/collection/cases-by-kate"),
                }]).appendTo(this.container);
        })));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map