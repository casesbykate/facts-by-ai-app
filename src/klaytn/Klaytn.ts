class Klaytn {

    private caver = new (window as any).Caver(new (window as any).Caver.providers.WebsocketProvider("wss://klaytn-node.klu.bs:9091"));

    public createContract(address: string, abi: any) {
        return this.caver.contract.create(abi, address);
    }
}

export default new Klaytn();
