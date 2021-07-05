const express = require('express');
const users = require('../models/users').users;
const algorithms = require('../models/algorithms').algorithms;
const favourites = require('../models/favourites').favourites;
const route = express.Router();

route.get('/getAll', async (req, res) => {
    try {
        const data = await algorithms.find({});
        return res.json(data);
    } catch(error) {
        console.log('There has been an error while getAll: ' + error);
        return res.jsnon({'error': 'Error while fetching data'});
    }
})

// route.get('/add/fav', async (req, res) => {

// })



module.exports = {
    route
};
