const express = require('express');
const path = require('path');
const users = require('../models/users').users;
const multer = require('multer');
const fs = require('fs');
const route = express.Router();

const storage_engine = multer.diskStorage({
    destination: '../algorithm-visualizer/algorithm-visualizer/build/img',
    filename: function (req, file, done) {

        done(null, req.user.username + '-' + Date.now() + path.extname(file.originalname));//path.extname can extract extension name from file name
    }
});

//creating fileFilter function

const customFileFilter = function (req, file, done) {
    console.log(file)
    const regex = /\jpg$|\jpeg$|\png$|\gif$/

    const check_filename = regex.test(file.originalname);

    const check_mimetype = regex.test(file.mimetype);

    if (check_filename && check_mimetype) {
        done(null, true);
    } else {
        done('Error: Images only');
    }
}

const upload = multer({
    storage: storage_engine,
    limits: { fileSize: 1000000 },
    fileFilter: customFileFilter
}).single('profile_image');  //name should be profile_image


/**
 * Handling post request containing the file(profile_picture).
 * Hmmm...Don't know multer's specifications with async, going
 * with the traditional style of callbacks
 */
route.post('/upload/profile_image', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ 'error': 'Error while uploading file' });
        } else {
            if (req.file === undefined) {
                return res.json({ 'error': 'File doesn\'t exists' });
            } else {

                if (req.user.profile_picture !== '000.png') {
                    //deleting the existing profile picture of the user
                    fs.unlink('../algorithm-visualizer/algorithm-visualizer/build/img/' + req.user.profile_picture, (err) => {
                        if (err) {
                            console.log(err);
                            return res.json({ 'error': 'error while deleting existing profile picture' });
                        }
                        console.log('The file has been deleted');
                    });
                }
                req.user.profile_picture = req.file.filename;
                users.findOneAndUpdate({ "username": req.user.username }, {
                    $set: {
                        profile_picture: req.file.filename
                    }
                }, (err, docs) => {
                    if (err) {
                        console.log("Error Occured while uploading");
                        return res.json({ 'error': 'error occured while writing database' });
                    }
                    return res.json({ 'file': req.file.filename });
                })
            }
        }
    })
})

route.post('/upload/cover_image', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ 'error': 'Error while uploading file' });
        } else {
            if (req.file === undefined) {
                return res.json({ 'error': 'File doesn\'t exists' });
            } else {

                if (req.user.profile_picture !== 'cover_pic.png') {
                    //deleting the existing cover picture of the user
                    fs.unlink('../algorithm-visualizer/algorithm-visualizer/build/img/' + req.user.profile_picture, (err) => {
                        if (err) {
                            console.log(err);
                            return res.json({ 'error': 'error while deleting existing profile picture' });
                        }
                        console.log('The file has been deleted');
                    });
                }
                req.user.cover_picture = req.file.filename;
                users.findOneAndUpdate({ "username": req.user.username }, {
                    $set: {
                        cover_picture: req.file.filename
                    }
                }, (err, docs) => {
                    if (err) {
                        console.log("Error Occured while uploading");
                        return res.json({ 'error': 'error occured while writing database' });
                    }
                    return res.json({ 'file': req.file.filename });
                })
            }
        }
    })
})

route.get('/verify_user', (req, res) => {
    if (req.user) {
        if (req.user.username === 'admin') {
            return res.json({ 'user': req.user });
        }
        return res.json({ 'user': req.user });
    }

    return res.json(undefined);
})


module.exports = {
    route
};