const express = require('express');
const bodyParser = require('body-parser');
const Server = require('./server');

const HTTP_PORT = 3000;

const app = express();
const serv = new Server();

app.use(bodyParser.json());

app.post('/data', (req, res) => {
    const { data } = req.body;
    serv.sendData(data);
    res.redirect('/ok');
});

app.get('/ok', (req, res) => {
    res.json('super ok');
});

app.post('/vote', (req, res) => {
    const vote = req.body;
    // const { candidateToVote, voter } = res.bo
    serv.addVote(vote);
    res.json('added');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
serv.listen();