"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Selectable_1 = __importDefault(require("./Selectable"));
const TypingText_1 = __importDefault(require("./TypingText"));
class NotEnoughMixPopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        let main;
        this.append(this.content = (0, skynode_1.el)(".popup.not-enough-mix-popup", main = (0, skynode_1.el)("main", new TypingText_1.default("1 MIX가 필요합니다. 클레이스왑에서 구매하시겠습니까?", () => {
            new Selectable_1.default([{
                    name: "예",
                    callback: () => open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf"),
                }, {
                    name: "아니오",
                    callback: () => this.delete(),
                }]).appendTo(main);
        }))));
    }
}
exports.default = NotEnoughMixPopup;
//# sourceMappingURL=NotEnoughMixPopup.js.map