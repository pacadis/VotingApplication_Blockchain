const Transaction = require('../wallet/transaction');

class Miner {
    constructor(transactionPool, p2pServer) {
        this.transactionPool = transactionPool;
        this.p2pServer = p2pServer;
    }

    mine(voter_id, voter_option, blockchain) {
        const vote = this.transactionPool.getVote(voter_id);
        if (vote) {
            // console.log(blockchain[0]);
            blockchain.forEach(bc => {
                if (bc.getGenesisData() === voter_option) {
                    bc.addBlock(vote);
                    // console.log(block);
                    // console.log(bc.getGenesisData());
                    this.p2pServer.syncChains(bc);
                    this.transactionPool.clear();
                    this.p2pServer.broadcastClearPool();
                }
            });
            // console.log(block);
            // this.p2pServer.syncChains(this.blockchain);
            // this.transactionPool.clear();
            // this.p2pServer.broadcastClearPool();
            // return block;
        }
        return null;
    }
}

module.exports = Miner;