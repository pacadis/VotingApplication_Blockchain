const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');

class Signer {
    constructor() {
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet -
          publicKey: ${this.publicKey.toString()}`;
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(transactionPool, voter_id) {

        let transaction = transactionPool.existingTransaction(this.publicKey);

        if (!transaction){
            transaction = Transaction.newTransaction(this, voter_id);
            transactionPool.addTransaction(transaction);
        }

        return transaction;
    }
}

module.exports = Signer;