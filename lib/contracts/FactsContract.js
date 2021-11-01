"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contract_1 = __importDefault(require("./Contract"));
class FactsContract extends Contract_1.default {
    constructor() {
        super("0x9476F388E2a36Fb3A1507176E290f8Fe125876B4", require("./FactsContractABI.json"));
    }
    async exists(id) {
        return await this.runMethod("exists", id);
    }
    async mint(id, fact) {
        await this.runWalletMethod("mint", id, fact);
    }
}
exports.default = new FactsContract();
//# sourceMappingURL=FactsContract.js.map