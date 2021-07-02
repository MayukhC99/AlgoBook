const express = require('express');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('./passport').passport;
const path = require('path');

//setting up process enviornment
dotenv.config({ path: path.join(__dirname, '../config/config.env') });

//connecting to database
require('../config/connection_db').connect_with_mongoDB();

const app = express();
const port = process.env.PORT || 8000;

//decrypting json and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//initializing passport
app.use(expressSession({
    secret: 'algobooksecretdonttrytodecrypt'
}));
app.use(passport.initialize());
app.use(passport.session());

// Let Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../algorithm-visualizer/build')));


//Define routes
app.use('/root', require('./routes/root').route);
app.use('/signup', require('./routes/signup').route);
app.use('/login', require('./routes/login').route);

app.listen(port,()=>{console.log(`Mode: ${process.env.NodeEnv} hosted on port ${port}`)});