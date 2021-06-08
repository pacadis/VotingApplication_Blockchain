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
                        // bcrypt.compare(password, user.password).then(match => {
                        //     if (match) {
                        //         status = 200;
                        //         // Create a token
                        //         const payload = { user: user.username };
                        //         const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
                        //         const secret = process.env.JWT_SECRET;
                        //         const token = jwt.sign(payload, secret, options);
                        //
                        //         result.token = token;
                        //         result.status = status;
                        //         result.result = user;
                        //     } else {
                        //         status = 401;
                        //         result.status = status;
                        //         result.error = `Authentication error`;
                        //     }
                        //     res.status(status).send(result);
                        // }).catch(err => {
                        //     status = 500;
                        //     result.status = status;
                        //     result.error = err;
                        //     res.status(status).send(result);
                        // });
                        mongoose.connection.close();
                        next();
                        //

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