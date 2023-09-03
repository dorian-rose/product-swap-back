const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


// Configure multer storage 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        // folder: 'your_folder_name', // Optional - specify a folder in your Cloudinary account
        // format: async (req, file) => 'jpg', // Optional - specify the format (you can also keep the original format)
        public_id: (req, file) => file.originalname
    },
});


//see multer documentation 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../public/uploads"));
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

const uploadMiddleware = multer({ storage: storage });

module.exports = { uploadMiddleware };