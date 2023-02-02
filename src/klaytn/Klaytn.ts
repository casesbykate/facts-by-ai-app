class Klaytn {

    private caver = new (window as any).Caver(new (window as any).Caver.providers.WebsocketProvider("wss://klaytn04.fandom.finance/ws"));

    public createContract(address: string, abi: any) {
        return this.caver.contract.create(abi, address);
    }
}

export default new Klaytn();
