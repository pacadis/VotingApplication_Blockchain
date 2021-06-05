class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    updateOrAddTransaction(vote) {
        this.transactions.push(vote);
    }

    existingTransaction(address) {
        return this.transactions.find(t => t.input.address === address);
    }

    getVote() {
        return this.transactions[0];
    }

    clear(voter_id) {
        // this.transactions.shift();
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