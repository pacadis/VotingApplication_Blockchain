require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const P2pServer = require('./app/p2p-server');
const Wallet = require('./wallet');
const TransactionPool = require('./wallet/transaction-pool');

const validateToken = require('./login/utils').validateToken;
const validateUser = require('./login_utils').validateVoterId;

const router = express.Router();

const environment = process.env.NODE_ENV;
const stage = require('./login/config');
const routes = require('./login/routes');

const app = express();
let bc = [];
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(tp);
let voters_submitted = [];
let vote_open = true;
let results;
let calculated = false;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.use(cors());

app.get('/blocks', (req, res) => {
    bc = p2pServer.getBlockchains('candidate1');
   res.status(200).json(bc);
});

app.post('/api/add_vote', (req, res) => {
    if (vote_open) {
        validateToken(req, res, () => {
            console.log("Token verified");
            const {id_voter, username} = req.body;
            console.log(id_voter + "   " + username);
            if (!voters_submitted.includes(id_voter)) {
                // console.log(validateUser(id_voter, username));
                validateUser(id_voter, username,
                    () => {
                        const vote = wallet.createTransaction(tp, id_voter);
                        voters_submitted.push(id_voter);
                        p2pServer.addVote(vote);
                        res.status(200).json('added vote');
                    }, () => {
                        res.status(404).json('invalid user');
                    });
            } else {
                console.log("already voted");
                res.status(403).json('Persoana deja a votat');
            }
        });
    } else {
        res.status(400).json('vote closed');
    }
});

app.post('/api/confirm_vote', (req, res) => {
    if (vote_open) {
        validateToken(req, res, () => {
            const {voter_id, candidate} = req.body;
            p2pServer.confirmVote(voter_id, candidate);
            console.log(p2pServer.blockchain);
            res.json('confirmed');
        });
    }
    else {
        res.status(400).send('vote closed');
    }
});

app.get('/api/get_candidates', (req, res) => {
   // validateToken(req, res, () => {
       let candidates = p2pServer.getCandidates();
       console.log(candidates);
       res.json(candidates);
   // });
});

app.get('/api/get_results', (req, res) => {
    if (!vote_open) {
        if (!calculated) {
            results = p2pServer.getResults();
            calculated = true;
        }
        console.log("//////////////////////////////////////////////")
        console.log(results);
        res.status(200).json(results);
    } else {
        res.status(400).json('vote not closed yet');
    }
});

app.post('/api/close_vote', (req, res) => {
   vote_open = false;
   p2pServer.calculateResults();
   res.status(200).json();
});

app.use('/api', routes(router));

app.listen(`${stage.development.port}`, () => {
    console.log(`Server now listening at localhost:${stage.development.port}`);
});

p2pServer.listen();

module.exports = app;