"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth_controller");
const authRoutes = express_1.default.Router();
// main auth
authRoutes.post('/login', auth_controller_1.loginController);
authRoutes.post('/sign_up', auth_controller_1.signUpController);
authRoutes.post('/send_otp', auth_controller_1.sendOTPController);
// user
authRoutes.get('/get_user', auth_controller_1.getUserController);
authRoutes.put('/update_user', auth_controller_1.updateUserController);
authRoutes.post('/forget_password', auth_controller_1.forgetPassController);
authRoutes.patch('/change_password', auth_controller_1.changePassController);
exports.default = authRoutes;
//# sourceMappingURL=auth_routes.js.map