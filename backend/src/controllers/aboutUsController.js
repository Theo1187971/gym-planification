const { error } = require('console');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../uploads/about_us_pictures');

exports.randomImage = async (req, res) => {
  fs.readdir(IMAGES_DIR, (err, files) => {
    if (err) {
        console.log(err);
        return res.status(500).json({error: 'Could not read images'});
    }

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
    if (imageFiles.length === 0) return res.status(404).json({ error: 'No images found' });

    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    const imagePath = path.join(IMAGES_DIR, randomImage);

    res.sendFile(imagePath);
  });
};