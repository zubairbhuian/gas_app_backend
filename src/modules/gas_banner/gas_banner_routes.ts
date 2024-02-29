import express from "express";
import { createGasBannerController, deleteGasBannerController, getGasBannerController, updateGasBannerController, deleteAllGasBannerController } from "./gas_banner_controller";
import verifyToken from "../../middleware/verify_token_middleware";
import multer from "multer";
import path from 'path';


// Define the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: 'public/uploads/banner',
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

const gasBannerRoutes = express.Router();

gasBannerRoutes.get('/', verifyToken, getGasBannerController);
gasBannerRoutes.post('/', verifyToken, upload.single('image'), createGasBannerController);
gasBannerRoutes.put('/', verifyToken, upload.single('image'), updateGasBannerController);
gasBannerRoutes.delete('/', verifyToken, deleteGasBannerController);
gasBannerRoutes.delete('/delete_all', verifyToken, deleteAllGasBannerController);


export default gasBannerRoutes;