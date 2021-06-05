const Websocket = require('ws');

const WS_PORT = process.env.P2P_PORT || 5000;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const MESSAGE_TYPES = {
    create_chains: 'CREATE_CHAINS',
    add_vote: 'ADD_VOTE'
}

class Server {
    constructor() {
        this.sockets = [];
    }

    listen() {
        const server = new Websocket.Server({port: WS_PORT});
        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers();

        console.log(`Listening for ws connections on: ${WS_PORT}`);
    }

    connectToPeers() {
        peers.forEach(peer => {
           const socket = new Websocket(peer);

           socket.on('open', () => this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket connected');

        // this.messageHandler(socket);
    }

    sendDataToBlockchain(socket, data) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.create_chains,
            data
        }));
    }

    sendData(data) {
        console.log(`Trebuie trimis spre blockchain ${data}`);
        this.sockets.forEach(socket => this.sendDataToBlockchain(socket, data));
    }

    addVote(vote) {
        let { candidateToVote, voter } = vote;
        console.log(candidateToVote + " " + voter);
        // console.log(vote);
        this.sockets.forEach(socket => {
           socket.send(JSON.stringify({
               type: MESSAGE_TYPES.add_vote,
               // data: { head: candidateToVote, body: voter }
               data: JSON.stringify([ candidateToVote, voter ])
           }))
        });
    }
}

module.exports = Server;