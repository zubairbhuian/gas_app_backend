import express, { Router } from "express";
import { changePassController, forgetPassController, getUserController, loginController, sendOTPController, signUpController, updateUserController } from "./auth_controller";
import verifyToken from "../../middleware/verify_token_middleware";
const authRoutes = express.Router();
// main auth
authRoutes.post('/login', loginController);
authRoutes.post('/sign_up', signUpController);
authRoutes.post('/send_otp', sendOTPController);
// user
authRoutes.get('/get_user',verifyToken, getUserController);
authRoutes.put('/update_user',verifyToken, updateUserController);
authRoutes.post('/forget_password', forgetPassController);
authRoutes.patch('/change_password',verifyToken, changePassController);



export default authRoutes;
