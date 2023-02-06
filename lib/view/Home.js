"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Selectable_1 = __importDefault(require("../component/Selectable"));
const TypingText_1 = __importDefault(require("../component/TypingText"));
const Layout_1 = __importDefault(require("./Layout"));
class Home {
    constructor() {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".home-view", new TypingText_1.default(`Facts by AI

제너레이티브 NFT와 AI의 만남.
Facts By AI 발행은 종료되었습니다.
관련 코드는 공개, 라이센스 오픈되어 있으며,
궁금한 점은 디스코드 커뮤니티를 찾아주세요.`, () => {
            new Selectable_1.default([{
                    name: "케이스바이케이트 홈페이지 메인으로 이동",
                    callback: () => open("https://www.casesbykate.xyz/"),
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