"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const Alert_1 = __importDefault(require("../component/Alert"));
const Loading_1 = __importDefault(require("../component/Loading"));
const NotEnoughMixPopup_1 = __importDefault(require("../component/NotEnoughMixPopup"));
const Selectable_1 = __importDefault(require("../component/Selectable"));
const SelectCasePopup_1 = __importDefault(require("../component/SelectCasePopup"));
const TypingText_1 = __importDefault(require("../component/TypingText"));
const FactsContract_1 = __importDefault(require("../contracts/FactsContract"));
const MixContract_1 = __importDefault(require("../contracts/MixContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class MyCase {
    constructor() {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mycase-view", new TypingText_1.default(`나의 케이스를 선택하였습니다.

            지갑을 연결합니다…`, async () => {
            if (await Wallet_1.default.connected() !== true) {
                await Wallet_1.default.connect();
            }
            new Selectable_1.default([{
                    name: "케이스 선택하기",
                    callback: () => new SelectCasePopup_1.default((selected) => {
                        this.generate(selected);
                    }),
                }, {
                    name: "돌아가기",
                    callback: () => skyrouter_1.SkyRouter.go("/"),
                }]).appendTo(this.container);
        })));
    }
    generate(selected) {
        this.container.append(new TypingText_1.default("새로운 증언을 열람하시겠습니까?", () => {
            new Selectable_1.default([{
                    name: "예",
                    callback: () => {
                        let now = new Date();
                        this.container.append(new TypingText_1.default(`${now.getHours()}시 ${now.getMinutes()}분 등록된 새로운 증언을 조회합니다.\n\n`, async () => {
                            const loading = new Loading_1.default().appendTo(this.container);
                            const result = await superagent_1.default.get(`https://api.casesbykate.xyz/factsbyai-generate/${selected}`);
                            loading.delete();
                            this.container.append(new TypingText_1.default(result.text, () => {
                                this.container.append(new TypingText_1.default("\n새로운 증언을 민팅하시겠습니까?", () => {
                                    new Selectable_1.default([{
                                            name: "예(1MIX 소모)",
                                            callback: async () => {
                                                if (await Wallet_1.default.connected() !== true) {
                                                    await Wallet_1.default.connect();
                                                }
                                                const owner = await Wallet_1.default.loadAddress();
                                                if (owner !== undefined) {
                                                    const mixNeeded = ethers_1.utils.parseEther("1");
                                                    const mint = async () => {
                                                        if (result.text !== null && result.text !== undefined && result.text !== "") {
                                                            await FactsContract_1.default.mint(selected, result.text);
                                                            setTimeout(() => {
                                                                open(`https://opensea.io/assets/klaytn/${FactsContract_1.default.address}/${selected}`);
                                                                new Alert_1.default("민팅이 완료되었습니다.");
                                                                new Selectable_1.default([{
                                                                        name: "케이스 선택하기",
                                                                        callback: () => new SelectCasePopup_1.default((selected) => {
                                                                            this.generate(selected);
                                                                        }),
                                                                    }, {
                                                                        name: "돌아가기",
                                                                        callback: () => skyrouter_1.SkyRouter.go("/"),
                                                                    }]).appendTo(this.container);
                                                            }, 2000);
                                                        }
                                                    };
                                                    const balance = await MixContract_1.default.balanceOf(owner);
                                                    if (balance.lt(mixNeeded)) {
                                                        new NotEnoughMixPopup_1.default();
                                                    }
                                                    else if ((await MixContract_1.default.allowance(owner, FactsContract_1.default.address)).lt(mixNeeded)) {
                                                        await MixContract_1.default.approve(FactsContract_1.default.address, mixNeeded);
                                                        setTimeout(() => {
                                                            mint();
                                                        }, 2000);
                                                    }
                                                    else {
                                                        mint();
                                                    }
                                                }
                                            },
                                        }, {
                                            name: "아니오",
                                            callback: () => this.generate(selected),
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
exports.default = MyCase;
//# sourceMappingURL=MyCase.js.map