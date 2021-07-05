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

route.post('/add/fav', async (req, res) => {
    try {
        if (req.user && req.body.id){
            await favourites.create({'username': req.user.username, 'algoId': req.body.id});
            return res.json({'status': 'success'});
        } else {
            console.log(`Field missing on either user: ${req.user} or algoId: ${req.body.id}`);
            return res.json({'status': 'Failed'});
        }
    } catch(error) {
        console.log('Error occured while creating a fav: ' + error);
        return res.json({'error': 'Error occured while creating a fav item'});
    }
})

route.post('/undo/fav', async (req, res) => {
    try {
        if(req.user && req.body.id) {
            const removedAlgo = await favourites.findOneAndRemove({'username': req.user.username, 'algoId': req.body.id});
            console.log('successfully removed: ' + removedAlgo);
            return res.json({'status': 'success', 'data': removedAlgo});
        }
        return res.json({'status': 'user not logged in or id not passed'});
    } catch(error) {
        console.log('Error occured while deleting a fav: ' + error);
        return res.json({'error': 'Error occured while deleting a fav item'});
    }
})

//Fetch favs of a particular username and return the algoIds
route.get('/get/fav', async (req, res) => {
    try {
        let data = [];
        if (req.user){
            data = await favourites.find({'username': req.user.username})
        } else {
            console.log(`User doesn't exists`);
        }
        return res.json(data);
    } catch(error) {
        console.log('Error while fetching fav: ' + error);
        return res.json({'error': 'Error while fetching favs'});
    }
})



module.exports = {
    route
};
