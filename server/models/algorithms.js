const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const algorithm = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    name: String,
    body: String,
    type: String,
    link: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const algorithms = mongoose.model('algorithm', algorithm);

module.exports = {
    algorithms
};
