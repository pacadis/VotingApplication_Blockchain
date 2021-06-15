class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    addTransaction(vote) {
        this.transactions.push(vote);
    }

    existingTransaction(address) {
        return this.transactions.find(t => t.input.address === address);
    }

    getVote() {
        return this.transactions[0];
    }

    clear(voter_id) {
        let i = 0;
        while (i < this.transactions.length) {
            if (this.transactions[i].outputs.data === voter_id) {
                this.transactions.splice(i, 1);
            } else {
                i++;
            }
        }
    }
}

module.exports = TransactionPool;