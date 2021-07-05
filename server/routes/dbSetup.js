const express = require('express');
const algorithms = require('../models/algorithms').algorithms;
const algoAsset = require('../DBAssets/algorithms.json');
const route = express.Router();

route.get('/init', async (req, res) => {
    try {
        await algorithms.insertMany(algoAsset);
        console.log('Successfully initialized DB with Algo data');
        return res.json(algoAsset);
    } catch(error) {
        console.log('Failed to initilize DB: '+ error);
        return res.json({'error': 'Failed to initilize DB with algorithms'});
    }
})

route.get('/deleteAllAlgos', async (req, res) => {
    try {
        await algorithms.deleteMany({});
        console.log('Algorithms collection is emptied');
        return res.json({'status': 'success'});
    } catch(error) {
        console.log('Delete data failed: ' + error );
        return res.json({'error': 'Error occured while deleting all documents from Algorithms collection'});
    }
})

module.exports = {
    route
};
