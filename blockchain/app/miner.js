class Miner {
    constructor(transactionPool, p2pServer) {
        this.transactionPool = transactionPool;
        this.p2pServer = p2pServer;
    }

    mine(voter_id, voter_option, blockchain) {
        const vote = this.transactionPool.getVote(voter_id);
        if (vote) {
            blockchain.forEach(bc => {
                if (bc.getGenesisData() === voter_option) {
                    bc.addBlock(vote);
                    this.p2pServer.syncChains(bc);
                    this.transactionPool.clear();
                    this.p2pServer.broadcastClearPool();
                }
            });
        }
        return null;
    }
}

module.exports = Miner;