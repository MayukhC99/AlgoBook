const mongoose = require("mongoose");

const token = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        index: { expires: "720m" },
    },
});

const tokens = mongoose.model("token", token);

module.exports = {
    tokens
};
