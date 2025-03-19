const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String
    },
    ip: {
        type: String
    },
    port: {
        type: Number
    },
    parentip: {
        type: String
    },
    component: String
})

const iotSchema = new mongoose.Schema({
    name: {
        type: String
    },
    components: [memberSchema]
})

const iotModel = mongoose.model('Iot', iotSchema, "Iots");

exports.iotModel = iotModel;