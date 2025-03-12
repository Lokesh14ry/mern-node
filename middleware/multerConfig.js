const multer = require('multer');    // Import multer

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './storage') // Save file in storage folder
    },

    filename : function(req, file, cb) {
        cb(null, "image-" + file.originalname)
    }
}) 

module.exports = {
    multer,
    storage
} 