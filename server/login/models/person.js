const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const stage = require('../../config')[environment];

const Schema = mongoose.Schema;

const personSchema = new Schema({
    id: {
        type: "String",
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: "String",
        required: true,
        trim: true,
    },
    cnp: {
        type: "String",
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: "String",
        required: true,
        trim: true,
    },
    email: {
        type: "String",
        required: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: "String",
        required: true,
        trim: true,
        unique: true
    }
});

module.exports = mongoose.model('Person', personSchema);