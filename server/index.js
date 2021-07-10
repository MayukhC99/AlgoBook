const express = require('express');
const expressSession = require('express-session');
var cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const passport = require('./passport').passport;
const path = require('path');
const http = require('http');

//setting up process enviornment
dotenv.config({ path: path.join(__dirname, '../config/config.env') });

//connecting to database
require('../config/connection_db').connect_with_mongoDB();

const app = express();
const port = process.env.PORT || 8000;

const server = http.createServer(app);
const io = require('socket.io')(server);
//Include Socket to function anonymously 
require('./webSocket')(io)

//decrypting json and urlencoded
app.use(cookieParser());
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
app.use('/api/root', require('./routes/root').route);
app.use('/api/signup', require('./routes/signup').route);
app.use('/api/login', require('./routes/login').route);
app.use('/api/algo', require('./routes/algo').route);
app.use('/api/account', require('./routes/account').route);
app.use('/api/dbSetup', require('./routes/dbSetup').route);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../algorithm-visualizer/build/index.html'));
})

server.listen(port, () => { console.log(`Mode: ${process.env.NodeEnv} hosted on port ${port}`) });
