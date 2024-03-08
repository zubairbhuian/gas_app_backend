import express from "express";
import { createMyProductController, deleteMyProductController, getMyProductController, updateMyProductController } from "./my_product_controller";
import multer from "multer";
import path from 'path';


// Define the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: 'public/uploads/product',
    filename: function (req, file, cb) {
        // Ensure the file extension is .png or .jpg
        const allowedExtensions = ['.png', '.jpg'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            // Create a unique filename
            const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
            // Set filename to be unique + original extension
            cb(null, file.fieldname + '_' + uniqueSuffix + ext);
        } else {
            cb(new Error('Only .png and .jpg files are allowed!'), null);
        }
    }
});


const upload = multer({ storage: storage });

const MyProductRoutes = express.Router();

MyProductRoutes.get('/', getMyProductController);
MyProductRoutes.post('/',upload.single('image'), createMyProductController);
MyProductRoutes.put('/', updateMyProductController);
MyProductRoutes.delete('/', deleteMyProductController);


export default MyProductRoutes;