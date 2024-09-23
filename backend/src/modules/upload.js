import express from 'express';
import multer from 'multer';
import fs from 'node:fs';
import crypto from 'crypto';

const uploader = multer( { dest: '../frontend/public/img/uploads' } );

const upload = express.Router();

upload.post('/', uploader.single('imgReview'), (req, res) => {
    if (req.file) {
        const path = saveImage(req.file)
        res.json({ path: path })
    } else {
        console.log("NO IMAGE LOADED")
    }
})

function saveImage(file) {
    const newPath = `../frontend/public/img/uploads/${crypto.randomBytes(32).toString('hex')}.jpg`;
    fs.renameSync(file.path,newPath)
    return newPath;
}

export const uploads = {
    upload
}