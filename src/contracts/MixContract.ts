import KIP7Contract from "./standard/KIP7Contract";

class MixContract extends KIP7Contract {

    constructor() {
        super("0xDd483a970a7A7FeF2B223C3510fAc852799a88BF", require("./MixContractABI.json"));
    }
}

export default new MixContract();
