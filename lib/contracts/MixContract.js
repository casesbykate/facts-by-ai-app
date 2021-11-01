"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const KIP7Contract_1 = __importDefault(require("./standard/KIP7Contract"));
class MixContract extends KIP7Contract_1.default {
    constructor() {
        super("0xDd483a970a7A7FeF2B223C3510fAc852799a88BF", require("./MixContractABI.json"));
    }
}
exports.default = new MixContract();
//# sourceMappingURL=MixContract.js.map