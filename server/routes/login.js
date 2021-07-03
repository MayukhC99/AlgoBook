const express = require('express');
const passport = require('../passport').passport;
const route = express.Router();

route.post('/getin',passport.authenticate('local', {
    failureRedirect: '/api/login/failure',
    successRedirect: '/api/login/success'
}));

route.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

route.get('/failure',(req,res)=>{
    console.log('Failed to Login');
    res.redirect('/signIn')
})

route.get('/success',(req,res)=>{
    console.log('Login Successful');
    res.redirect('/');
})

module.exports = {
    route
}