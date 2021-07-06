const express = require('express');
const path = require('path');
const users = require('../models/users').users;
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('../cloudinary')
const route = express.Router();

// const storage_engine = multer.diskStorage({
//     destination: '../algorithm-visualizer/algorithm-visualizer/build/img',
//     filename: function (req, file, done) {

//         done(null, req.user.username + '-' + Date.now() + path.extname(file.originalname));//path.extname can extract extension name from file name
//     }
// });

//creating fileFilter function

const customFileFilter = function (req, file, done) {
    console.log(file)
    const regex = /\jpg$|\jpeg$|\png$|\gif$|\jfif$/

    const check_filename = regex.test(file.originalname);

    const check_mimetype = regex.test(file.mimetype);

    if (check_filename && check_mimetype) {
        done(null, true);
    } else {
        done(new Error("File type is not supported"), false);
    }
}

const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 1000000 },
    fileFilter: customFileFilter
}).single('profile_image');  //name should be profile_image


/**
 * Handling post request containing the file(profile_picture).
 * Hmmm...Don't know multer's specifications with async, going
 * with the traditional style of callbacks
 */
route.post('/upload/profile_image', async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.json({ 'error': 'Error while uploading file' });
            } else {
                if (req.file === undefined) {
                    return res.json({ 'error': 'File doesn\'t exists' });
                } else {
                    if (req.user.profile_cloudinary_id) {
                        await cloudinary.uploader.destroy(req.user.profile_cloudinary_id);
                    }
                    const result = await cloudinary.uploader.upload(req.file.path, {
                        upload_preset: "algobook_uplaods",
                    });
                    req.user.profile_picture = result.secure_url
                    req.user.profile_cloudinary_id = result.public_id
                    users.findOneAndUpdate({ "username": req.user.username }, {
                        $set: {
                            profile_picture: result.secure_url,
                            profile_cloudinary_id: result.public_id
                        }
                    }, (err, docs) => {
                        if (err) {
                            console.log("Error Occured while uploading");
                            return res.json({ 'error': 'error occured while writing database' });
                        }
                        return res.json({ 'file': req.user.profile_picture, 'cloudinary_id': req.user.profile_cloudinary_id });
                    })
                }
            }
        })
    } catch (err) {
        console.log(err.message)
        return res.json({ 'error': err.message });
    }
})

route.post('/upload/cover_image', (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.json({ 'error': 'Error while uploading file' });
            } else {
                if (req.file === undefined) {
                    return res.json({ 'error': 'File doesn\'t exists' });
                } else {
                    if (req.user.cover_cloudinary_id) {
                        await cloudinary.uploader.destroy(req.user.cover_cloudinary_id);
                    }
                    const result = await cloudinary.uploader.upload(req.file.path, {
                        upload_preset: "algobook_uplaods",
                    });
                    req.user.cover_picture = result.secure_url
                    req.user.cover_cloudinary_id = result.public_id
                    users.findOneAndUpdate({ "username": req.user.username }, {
                        $set: {
                            cover_picture: result.secure_url,
                            cover_cloudinary_id: result.public_id
                        }
                    }, (err, docs) => {
                        if (err) {
                            console.log("Error Occured while uploading");
                            return res.json({ 'error': 'error occured while writing database' });
                        }
                        return res.json({ 'file': req.user.cover_picture, 'cloudinary_id': req.user.cover_cloudinary_id });
                    })
                }
            }
        })
    } catch (err) {
        console.log(err.message)
        return res.json({ 'error': err.message });
    }
})

route.get('/verify_user', (req, res) => {
    console.log(`Trying for varification of ${req.user}`);
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