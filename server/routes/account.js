const express = require('express');
const users = require('../models/users').users;
const route = express.Router();

route.post('/edit', async (req, res) => {
    try {
        const query = {'username': req.user.username};
        const update = {
            $set: {
                'first_name': req.body.first_name,
                'last_name': req.body.last_name,
                'email_id': req.body.email_id
            }
        };
        const options = { new: true };
        const data = await users.findOneAndUpdate(query, update, options);
        console.log(`Updated user: ${data}`);
        return res.send(data);
    } catch(error) {
        console.log('Error occured while editing account details: ' + error);
        return res.json({'error': 'Error occured while editing account details'});
    }
})

route.post('/change_password', async (req, res) => {
    try {
        const query = {'username': req.user.username};
        const update = {
            $set: {
                'password': req.body.password
            }
        };
        const options = { new: true };
        const data = await users.findOneAndUpdate(query, update, options);
        console.log(`Password successfully changed: ${data}`);
        return res.send(data);
    } catch(error) {
        console.log('Error occured while changing password: ' + error);
        return res.json({'error': 'Error occured while changing password'});
    }
})

module.exports = {
    route
};
