const moongose = require('mongoose');
const Schema = moongose.Schema;

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: String,
    last_name: String,
    email_id: String,
    profile_picture: {
        type: String,
        default: '/img/000.png'
    },
    profile_cloudinary_id: String,
    cover_picture: {
        type: String,
        default: '/img/cover_pic.png'
    },
    cover_cloudinary_id: String
}, {
    timestamps: true
})

const users = moongose.model('user', user);

module.exports = {
    users
}
