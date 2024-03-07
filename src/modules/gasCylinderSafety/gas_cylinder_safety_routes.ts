import express from "express";
import {  createGasCylinderSafetyController,  deleteGasCylinderSafetyController, getGasCylinderSafetyController, updateGasCylinderSafetyController } from "./gas_cylinder_safety_controller";
import verifyToken from "../../middleware/verify_token_middleware";
import multer from "multer";
import path from 'path';


// Define the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: 'public/uploads/gasCS',
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
const gasCylinderSafetyRoutes = express.Router();

gasCylinderSafetyRoutes.get('/',verifyToken, getGasCylinderSafetyController);
gasCylinderSafetyRoutes.post('/',verifyToken,upload.single('image'), createGasCylinderSafetyController);
gasCylinderSafetyRoutes.put('/',verifyToken,upload.single('image'), updateGasCylinderSafetyController);
gasCylinderSafetyRoutes.delete('/',verifyToken, deleteGasCylinderSafetyController);


export default gasCylinderSafetyRoutes;