"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth_controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define the destination and filename for uploaded files
const storage = multer_1.default.diskStorage({
    destination: 'public/uploads/gasCS',
    filename: function (req, file, cb) {
        // Ensure the file extension is .png or .jpg
        const allowedExtensions = ['.png', '.jpg'];
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            // Create a unique filename
            const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
            // Set filename to be unique + original extension
            cb(null, file.fieldname + '_' + uniqueSuffix + ext);
        }
        else {
            cb(new Error('Only .png and .jpg files are allowed!'), null);
        }
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const authRoutes = express_1.default.Router();
// main auth
authRoutes.post('/login', auth_controller_1.loginController);
authRoutes.post('/sign_up', auth_controller_1.signUpController);
authRoutes.post('/send_otp', auth_controller_1.sendOTPController);
// user
authRoutes.get('/get_user', verify_token_middleware_1.default, auth_controller_1.getUserController);
authRoutes.delete('/delete_user', verify_token_middleware_1.default, auth_controller_1.deleteUserController);
authRoutes.delete('/delete_all_user', verify_token_middleware_1.default, auth_controller_1.deleteAllUserController);
authRoutes.get('/get_user', verify_token_middleware_1.default, auth_controller_1.getUserController);
authRoutes.get('/get_all_user', verify_token_middleware_1.default, auth_controller_1.getAllUserController);
authRoutes.put('/update_user', verify_token_middleware_1.default, auth_controller_1.updateUserController);
authRoutes.put('/update_profile_picture', verify_token_middleware_1.default, upload.single('image'), auth_controller_1.updateProfilPictureController);
authRoutes.post('/forget_password', auth_controller_1.forgetPassController);
authRoutes.patch('/change_password', verify_token_middleware_1.default, auth_controller_1.changePassController);
exports.default = authRoutes;
//# sourceMappingURL=auth_routes.js.map