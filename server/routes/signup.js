const express = require('express');
const users = require('../models/users').users;
const route = express.Router();

route.post('/getin',(req,res)=>{
    if(req.body.password === req.body.confirmPassword) {
        console.log(req.body)
        users.create({
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_id: req.body.email_id
        }, function(err,docs){
            if(err){
                console.log("Error has occured");
                return res.send(undefined);
            }

            if(docs){
                console.log("User Created: ");
                console.log(docs);
                return res.send(docs);
            }
            else
                return res.send(undefined);
        })
    } else {
        return res.send(undefined)
    }
})

module.exports = {
    route
}