const mongoose = require('mongoose');

const connUri = process.env.MONGO_LOCAL_CONN_URL;
console.log(connUri);
const User = require('./login/models/users');

module.exports = {
    validateVoterId: (id, username, next, not_found) => {
        mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
            if(!err) {
                User.findOne({'username': username, 'id': id}, (err, user) => {
                    console.log(user);
                    if (!err && user) {
                        mongoose.connection.close();
                        next();
                    } else {
                        mongoose.connection.close();
                        not_found();
                    }
                });
            } else {
                return false;
            }
        });
    }
}