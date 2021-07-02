const mongoose = require('mongoose');
const create_admin = require('./create_admin').create_admin;

let connect_with_mongoDB = function () {

    let url = process.env.MONGO_URI;
    console.log(url);

    const connect = mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
    connect.then((db) => {
        console.log("Database successfully connected");
        create_admin();
        console.log("Admin Created");
    }, (err) => {
        console.log("And error has occured while connection");
        console.log(err);
    });
}


module.exports = {
    connect_with_mongoDB
};