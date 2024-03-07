import express, { Router } from "express";
import { changePassController, deleteAllUserController, deleteUserController, forgetPassController, getAllUserController, getUserController, loginController, sendOTPController, signUpController, updateProfilPictureController, updateUserController } from "./auth_controller";
import verifyToken from "../../middleware/verify_token_middleware";
import multer from "multer";
import path from 'path';




// Define the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: 'public/uploads/user',
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

const authRoutes = express.Router();




// main auth
authRoutes.post('/login', loginController);
authRoutes.post('/sign_up', signUpController);
authRoutes.post('/send_otp', sendOTPController);
// user
authRoutes.get('/get_user', verifyToken, getUserController);
authRoutes.delete('/delete_user', verifyToken, deleteUserController);
authRoutes.delete('/delete_all_user', verifyToken, deleteAllUserController);
authRoutes.get('/get_user', verifyToken, getUserController);
authRoutes.get('/get_all_user', verifyToken, getAllUserController);
authRoutes.put('/update_user', verifyToken, updateUserController);
authRoutes.post('/update_profile_picture', verifyToken,upload.single('image'), updateProfilPictureController);
authRoutes.post('/forget_password', forgetPassController);
authRoutes.patch('/change_password', verifyToken, changePassController);



export default authRoutes;
