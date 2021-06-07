require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const Blockchain = require('../blockchain');
const P2pServer = require('./app/p2p-server');
const Wallet = require('./wallet');
const TransactionPool = require('./wallet/transaction-pool');
// const Miner = require('./miner');

const validateToken = require('./login/utils').validateToken;

const router = express.Router();

// const HTTP_PORT = process.env.HTTP_PORT || 3001;

const environment = process.env.NODE_ENV;
const stage = require('./login/config');
const routes = require('./login/routes');

const app = express();
var bc = [];
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(tp);
// const miner = new Miner(bc, tp, wallet, p2pServer);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.get('/blocks', (req, res) => {
   // const { key } = req.body;
    bc = p2pServer.getBlockchains();
   res.json(bc);
});

app.post('/add_vote', (req, res) => {
    validateToken(req, res, () => {
        const {voter_id} = req.body;
        const vote = wallet.createTransaction(tp, voter_id);
        console.log(tp);
        p2pServer.addVote(vote);
        res.json('added vote');
    })
});

app.post('/confirm_vote', (req, res) => {
    validateToken(req, res, () => {
        const {voter_id, voter_option} = req.body;
        p2pServer.confirmVote(voter_id, voter_option);
        res.json('confirmed');
    });
});

app.use('/api', routes(router));

// app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));

app.listen(`${stage.development.port}`, () => {
    console.log(`Server now listening at localhost:${stage.development.port}`);
});

p2pServer.listen();

module.exports = app;