"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const TypingText_1 = __importDefault(require("../component/TypingText"));
const Layout_1 = __importDefault(require("./Layout"));
class MyCase {
    constructor() {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mycase-view", new TypingText_1.default(`나의 케이스를 선택하였습니다.

            지갑을 연결합니다…`, () => {
        })));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MyCase;
//# sourceMappingURL=MyCase.js.map