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
        default: '000.png'
    }
},{
    timestamps: true
})

const users = moongose.model('user',user);

module.exports = {
    users
}
