"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Klaytn {
    constructor() {
        this.caver = new window.Caver(new window.Caver.providers.WebsocketProvider("wss://klaytn-node.klu.bs:9091"));
    }
    createContract(address, abi) {
        return this.caver.contract.create(abi, address);
    }
}
exports.default = new Klaytn();
//# sourceMappingURL=Klaytn.js.map