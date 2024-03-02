import express from "express";
import { createMyProductController, deleteMyProductController, getMyProductController, updateMyProductController } from "./my_product_controller";
import multer from "multer";
import path from 'path';

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/product'); // Set the destination directory
        },
        filename: function (req, file, cb) {
            // Generate a unique filename by adding a timestamp
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    fileFilter: function (req, file, cb) {
        // Accept only PNG and JPG images
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only PNG and JPG images are allowed'));
        }
    }
});

const MyProductRoutes = express.Router();

MyProductRoutes.get('/', getMyProductController);
MyProductRoutes.post('/', createMyProductController);
MyProductRoutes.put('/', updateMyProductController);
MyProductRoutes.delete('/', deleteMyProductController);


export default MyProductRoutes;