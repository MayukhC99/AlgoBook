const express = require('express');
const users = require('../models/users').users;
const passport = require('../passport').passport;
const sender = require("./mailer")
const tokens = require("../models/token").tokens;
const crypto = require("crypto");
const route = express.Router();

route.post('/getin', passport.authenticate('local', {
    failureRedirect: '/api/login/failure',
    successRedirect: '/api/login/success'
}));

route.get('/logout', (req, res) => {
    req.logout();
    console.log('logged out: ', req.user);
    return res.json({ 'status': 'logged out' });
})

route.get('/failure', (req, res) => {
    console.log('Failed to Login');
    res.redirect('/signIn')
})

route.get('/success', (req, res) => {
    console.log('Login Successful');
    res.redirect('/');
})

route.post('/forgot/password', async (req, res) => {
    try {
        const user = await users.findOne({ email_id: req.body.email_id });
        if (!user)
            throw new Error("We were unable to find a user with that email.");

        // Create a verification token, save it, and send email
        const token = new tokens({
            _userId: user._id,
            token: crypto.randomBytes(16).toString("hex"),
        });

        // Save the token
        await token.save();

        const data = {
            templateName: "password_reset_confirm",
            sender: "no.reply.algobook@gmail.com",
            receiver: user.email_id,
            subject: 'Your AlgoBook password reset request',
            name: user.first_name + " " + user.last_name,
            reset_password_url: `${req.protocol}://${req.headers.host}/api/login/reset/password/${user.email_id}/${token.token}`
        };
        const mail = await sender.sendEmail(data);
        console.log(mail)
        return res.json({ "success": `Password reset mail has been sent to ${user.email_id}. Check Spam and other folders also.` });
    } catch (err) {
        return res.json({ "error": err.message })
    }
})

route.get("/reset/password/:email_id/:token", async (req, res) => {
    try {
        // If we found a token, find a matching user
        const user = await users.findOne({ email_id: req.params.email_id });
        if (!user) throw new Error("We were unable to find a user for this token.");

        const token = await tokens.findOneAndDelete({ token: req.params.token });
        if (!token)
            throw new Error(
                `We were unable to find a valid token. Your token may have expired. <a href="/forgot/password">Click here</a> to resend verification email.`
            );
        console.log("Token verified")
        res.cookie("email_id", `${req.params.email_id}`, { httpOnly: false });
        return res.redirect('/reset_password');
    } catch (err) {
        console.log(err.message)
        res.redirect("/signIn");
    }
});

route.post('/reset_password', async (req, res) => {
    try {
        const query = { 'email_id': req.body.email_id };
        const update = {
            $set: {
                'password': req.body.newPassword
            }
        };
        const options = { new: true };
        console.log(req.body)
        const data = await users.findOneAndUpdate(query, update, options);
        console.log(`Password successfully changed: ${data}`);
        return res.json({ 'success': 'Password Updated Successfully!!!' });
    } catch (error) {
        console.log('Error occured while changing password: ' + error);
        return res.json({ 'error': 'Error occured while changing password' });
    }
})

route.post('/remove/cookie', (req, res) => {
    res.cookie('email_id', null, {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    res.end()
})

module.exports = {
    route
}