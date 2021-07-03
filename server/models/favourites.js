const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favourite = new Schema({
    username: {
        type: String,
        required: true
    },
    algoId: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

favourite.index({ username: 1, algoId: 1 }, { unique: true });

const favourites = mongoose.model('favourite', favourite);

module.exports = {
    favourites
};
