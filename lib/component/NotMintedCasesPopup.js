"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const FactsContract_1 = __importDefault(require("../contracts/FactsContract"));
const Selectable_1 = __importDefault(require("./Selectable"));
const TypingText_1 = __importDefault(require("./TypingText"));
class NotMintedCasesPopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        let main;
        this.append(this.content = (0, skynode_1.el)(".popup.not-minted-cases-popup", main = (0, skynode_1.el)("main", new TypingText_1.default("사실 확인이 되지 않은 케이스\n\n케이스 번호를 입력하세요.\n", () => {
            let input;
            (0, skynode_1.el)("form", input = (0, skynode_1.el)("input"), (0, skynode_1.el)("input", { type: "submit", value: "검색" }), {
                submit: (e) => {
                    const id = parseInt(input.domElement.value, 10);
                    if (isNaN(id) !== true) {
                        new TypingText_1.default("조회 중입니다...\n\n", async () => {
                            if (await FactsContract_1.default.exists(id) !== true) {
                                new TypingText_1.default(`케이스 #${id} 번은 민팅 가능합니다.\n\n`).appendTo(main);
                            }
                            else {
                                new TypingText_1.default(`케이스 #${id} 번은 이미 민팅되었습니다.\n\n`).appendTo(main);
                            }
                            new Selectable_1.default([{
                                    name: "다른 케이스 검색",
                                    callback: () => {
                                        this.delete();
                                        new NotMintedCasesPopup();
                                    },
                                }, {
                                    name: "닫기",
                                    callback: () => this.delete(),
                                }]).appendTo(main);
                        }).appendTo(main);
                    }
                    e.preventDefault();
                },
            }).appendTo(main);
            input.domElement.select();
        }))));
    }
}
exports.default = NotMintedCasesPopup;
//# sourceMappingURL=NotMintedCasesPopup.js.map