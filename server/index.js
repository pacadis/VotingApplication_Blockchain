require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Server = require('./server');
const cors = require('cors');
const routes = require('./login/routes');
const router = express.Router();
const logger = require('morgan');
const validateToken = require('./login/utils').validateToken;

const HTTP_PORT = 2999;

const app = express();
const environment = process.env.NODE_ENV;
const serv = new Server();

let vote_created = false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.post('/api/data', (req, res) => {
    validateToken(req, res, () => {
        const data = req.body;
        console.log(data);
        let candidates = [];
        for (let key in data) {
            candidates.push(data[key]);
        }
        serv.sendData(candidates);
        vote_created = true;
        res.status(200).json('super ok');
    });
});


app.get('/api/status', (req, res) => {
    console.log(vote_created);
   if (vote_created === false) {
       res.status(404).json('not created');
   } else {
       res.status(200).json('created');
   }
});

app.use('/api', routes(router));

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
serv.listen();

module.exports = app;