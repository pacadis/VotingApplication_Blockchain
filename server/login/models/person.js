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
        match: [/^([a-zA-Z]{2,}\s[a-zA-Z]+'?-?[a-zA-Z]{2,}\s?([a-zA-Z]+)?)+$/, 'Nume incorect']
    },
    cnp: {
        type: "String",
        required: true,
        trim: true,
        unique: true,
        match: [/^([0-9]{13})+$/, 'CNP trebuie sa contina 13 cifre']
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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Adresa de email nevalida']
    },
    phone: {
        type: "String",
        required: true,
        trim: true,
        unique: true,
        match: [/^(7[0-9]{8})+$/, 'Numar de telefon incorect']
    }
});

module.exports = mongoose.model('Person', personSchema);