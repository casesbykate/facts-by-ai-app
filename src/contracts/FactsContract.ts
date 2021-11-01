import { BigNumberish } from "@ethersproject/bignumber";
import Contract from "./Contract";

class FactsContract extends Contract {

    constructor() {
        super("0x9476F388E2a36Fb3A1507176E290f8Fe125876B4", require("./FactsContractABI.json"));
    }

    public async exists(id: BigNumberish): Promise<boolean> {
        return await this.runMethod("exists", id);
    }

    public async mint(id: BigNumberish, fact: string) {
        await this.runWalletMethod("mint", id, fact);
    }
}

export default new FactsContract();
