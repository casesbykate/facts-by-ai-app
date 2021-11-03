"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const FactsContract_1 = __importDefault(require("../contracts/FactsContract"));
const NFTContract_1 = __importDefault(require("../contracts/NFTContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Selectable_1 = __importDefault(require("./Selectable"));
const TypingText_1 = __importDefault(require("./TypingText"));
class SelectCasePopup extends skynode_1.Popup {
    constructor(callback) {
        super(".popup-background");
        let main;
        this.append(this.content = (0, skynode_1.el)(".popup.select-case-popup", main = (0, skynode_1.el)("main", new TypingText_1.default("케이스를 선택해주세요."), this.caseList = (0, skynode_1.el)(".case-list"), new TypingText_1.default("\n선택된 케이스로 실행하시겠습니까?", async () => {
            new Selectable_1.default([{
                    name: "예",
                    callback: () => {
                        if (this.selected !== undefined) {
                            callback(this.selected);
                            this.delete();
                        }
                    },
                }, {
                    name: "아니오",
                    callback: () => {
                        this.delete();
                    },
                }]).appendTo(main);
        }))));
        this.load();
    }
    async load() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const balance = await NFTContract_1.default.balanceOf(owner);
            let selectedCase;
            skyutil_1.default.repeatResultAsync(balance.toNumber(), async (index) => {
                const tokenId = await NFTContract_1.default.tokenOfOwnerByIndex(owner, index);
                if (await FactsContract_1.default.exists(tokenId) !== true) {
                    let _case;
                    this.caseList.append(_case = (0, skynode_1.el)("a.case", (0, skynode_1.el)("h5", `Case #${tokenId}`), (0, skynode_1.el)("img", { src: `https://storage.googleapis.com/cbk-nft/v2/${tokenId}.png`, height: "300" }), {
                        click: () => {
                            this.selected = tokenId.toNumber();
                            selectedCase?.deleteClass("selected");
                            selectedCase = _case;
                            selectedCase.addClass("selected");
                        },
                    }));
                }
            });
        }
    }
}
exports.default = SelectCasePopup;
//# sourceMappingURL=SelectCasePopup.js.map