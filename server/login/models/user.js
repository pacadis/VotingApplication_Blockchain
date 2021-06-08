const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const stage = require('../../config')[environment];
// console.log(stage.saltingRounds);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    }
});

//encrypt password before save
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
        next();
    } else {
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.username);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model('User', userSchema);
