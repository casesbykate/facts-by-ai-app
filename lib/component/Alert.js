"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Selectable_1 = __importDefault(require("./Selectable"));
const TypingText_1 = __importDefault(require("./TypingText"));
class Alert extends skynode_1.Popup {
    constructor(message) {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".popup.alert", new TypingText_1.default(message, () => {
            new Selectable_1.default([{
                    name: "닫기",
                    callback: () => this.delete(),
                }]).appendTo(this.content);
        })));
    }
}
exports.default = Alert;
//# sourceMappingURL=Alert.js.map