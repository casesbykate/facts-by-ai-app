"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const Alert_1 = __importDefault(require("../component/Alert"));
const Loading_1 = __importDefault(require("../component/Loading"));
const Selectable_1 = __importDefault(require("../component/Selectable"));
const TypingText_1 = __importDefault(require("../component/TypingText"));
const Layout_1 = __importDefault(require("./Layout"));
class SampleCase {
    constructor() {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".samplecase-view", new TypingText_1.default("샘플 케이스를 선택하였습니다.", () => {
            this.container.append((0, skynode_1.el)("img.case", { src: "https://storage.googleapis.com/cbk-nft/v2/1.png", height: "400" }));
            this.generate();
        })));
    }
    generate() {
        this.container.append(new TypingText_1.default("새로운 증언을 열람하시겠습니까?", () => {
            new Selectable_1.default([{
                    name: "예",
                    callback: () => {
                        let now = new Date();
                        this.container.append(new TypingText_1.default(`${now.getHours()}시 ${now.getMinutes()}분 등록된 새로운 증언을 조회합니다.\n\n`, async () => {
                            const loading = new Loading_1.default().appendTo(this.container);
                            const result = await superagent_1.default.get("https://api.casesbykate.xyz/factsbyai-generate/1");
                            loading.delete();
                            this.container.append(new TypingText_1.default(result.text, () => {
                                this.container.append(new TypingText_1.default("\n새로운 증언을 민팅하시겠습니까?", () => {
                                    new Selectable_1.default([{
                                            name: "예(1MIX 소모)",
                                            callback: () => new Alert_1.default("샘플 케이스의 경우에는 민팅이 불가능합니다."),
                                        }, {
                                            name: "아니오",
                                            callback: () => this.generate(),
                                        }]).appendTo(this.container);
                                }));
                            }));
                        }));
                    },
                }, {
                    name: "아니오",
                    callback: () => skyrouter_1.SkyRouter.go("/"),
                }]).appendTo(this.container);
        }));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = SampleCase;
//# sourceMappingURL=SampleCase.js.map