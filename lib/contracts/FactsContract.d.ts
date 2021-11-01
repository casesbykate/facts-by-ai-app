import { BigNumberish } from "@ethersproject/bignumber";
import Contract from "./Contract";
declare class FactsContract extends Contract {
    constructor();
    exists(id: BigNumberish): Promise<boolean>;
    mint(id: BigNumberish, fact: string): Promise<void>;
}
declare const _default: FactsContract;
export default _default;
//# sourceMappingURL=FactsContract.d.ts.map