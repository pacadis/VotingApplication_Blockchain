const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connUri = process.env.MONGO_LOCAL_CONN_URL;
console.log(connUri);
const User = require('../models/users');
const Person = require('../models/person');
const generateId = require('../utils').generateId;

module.exports = {
    // add: (req, res) => {
    //     mongoose.connect(connUri, { useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    //         let result = {};
    //         let status = 201;
    //         if (!err) {
    //             const id = generateId(8);
    //             const {username, password } = req.body;
    //             const user = new User({ id, username, password}); // document = instance of a model
    //
    //             // TODO: We can hash the password here as well before we insert
    //             user.save((err, user) => {
    //                 if (!err) {
    //                     result.status = status;
    //                     result.result = user;
    //                 } else {
    //                     status = 500;
    //                     result.status = status;
    //                     result.error = err;
    //                 }
    //                 res.status(status).send(result);
    //                 mongoose.connection.close();
    //             });
    //         } else {
    //             status = 500;
    //             result.status = status;
    //             result.error = err;
    //             res.status(status).send(result);
    //             mongoose.connection.close();
    //         }
    //     });
    // },
    //
    // add_person: (req, res) => {
    //     mongoose.connect(connUri, { useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true}, (err) => {
    //        let result = {};
    //        let status = 201;
    //
    //        if (!err) {
    //            const { id, name, cnp, address, email, phone } = req.body;
    //            const person = new Person({ id, name, cnp, address, email, phone });
    //            person.save((err, person) => {
    //                if (!err) {
    //                    result.status = status;
    //                    result.result = person;
    //                } else {
    //                    status = 500;
    //                    result.status = status;
    //                    result.error = err;
    //                }
    //                res.status(status).send(result);
    //                mongoose.connection.close();
    //            });
    //        } else {
    //            status = 500;
    //            result.status = status;
    //            result.error = err;
    //            res.status(status).send(result);
    //            mongoose.connection.close();
    //        }
    //     });
    // },

    login: (req, res) => {
        const { username, password } = req.body;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
            let result = {};
            let status = 200;
            if(!err) {

                User.findOne({username}, (err, user) => {
                    console.log(user);
                    if (!err && user) {
                        bcrypt.compare(password, user.password).then(match => {
                            if (match) {
                                status = 200;
                                // Create a token
                                const payload = { user: user.username };
                                const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
                                const secret = process.env.JWT_SECRET;
                                const token = jwt.sign(payload, secret, options);

                                result.token = token;
                                result.status = status;
                                result.result = user;
                            } else {
                                status = 401;
                                result.status = status;
                                result.error = `Authentication error`;
                            }
                            res.status(status).send(result);
                        }).catch(err => {
                            status = 500;
                            result.status = status;
                            result.error = err;
                            res.status(status).send(result);

                            mongoose.connection.close();
                        });
                    } else {
                        status = 404;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    }
                }).then(() =>
                    mongoose.connection.close());
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);

                mongoose.connection.close();
            }
        });
    }
};