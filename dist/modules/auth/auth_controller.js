"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.getUserController = exports.sendOTPController = exports.changePassController = exports.forgetPassController = exports.signUpController = exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("./auth_model");
const secret_1 = require("../../utils/secret");
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email, and password' });
    }
    try {
        // Check if the user exists
        const user = yield auth_model_1.authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is correct
        const isPasswordValid = yield user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Create a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, secret_1.jwtSecretKey, { expiresIn: secret_1.tokenExpiresIn });
        const userWithoutPassword = { _id: user._id, email: user.email, phone: user.phone, addreass: user.addreass, photoURL: user.photoURL };
        res.status(200).json({
            message: 'Login successful',
            data: userWithoutPassword,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'server error'
        });
    }
});
exports.loginController = loginController;
// signUp
const signUpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, phone } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email, and password' });
    }
    try {
        // Check if the email already exists
        const existingUser = yield auth_model_1.authModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Create a new user
        const user = new auth_model_1.authModel({ email, password, phone });
        yield user.save();
        // Create a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, secret_1.jwtSecretKey, { expiresIn: secret_1.tokenExpiresIn });
        const userWithoutPassword = { _id: user._id, email: user.email, phone: user.phone, addreass: user.addreass, photoURL: user.photoURL };
        res.status(200).json({
            message: 'Signup successful',
            data: userWithoutPassword,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'server error'
        });
    }
});
exports.signUpController = signUpController;
// forget password
const forgetPassController = (req, res, next) => {
    res.send('forget');
};
exports.forgetPassController = forgetPassController;
// change password
const changePassController = (req, res, next) => {
    res.send('change');
};
exports.changePassController = changePassController;
// otp
const sendOTPController = (req, res, next) => {
    res.send('otp');
};
exports.sendOTPController = sendOTPController;
// get user
const getUserController = (req, res, next) => {
    res.send('user');
};
exports.getUserController = getUserController;
// Update user
const updateUserController = (req, res, next) => {
    res.send('otp');
};
exports.updateUserController = updateUserController;
//# sourceMappingURL=auth_controller.js.map