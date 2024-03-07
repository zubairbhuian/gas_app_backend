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
exports.deleteAllUserController = exports.deleteUserController = exports.updateProfilPictureController = exports.updateUserController = exports.getAllUserController = exports.getUserController = exports.sendOTPController = exports.changePassController = exports.forgetPassController = exports.signUpController = exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("./auth_model");
const secret_1 = require("../../utils/secret");
const resposnse_1 = require("../../helper/resposnse");
const fs_extra_1 = __importDefault(require("fs-extra"));
const mongoose_1 = __importDefault(require("mongoose"));
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'name, email, and password is required' });
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
        const userWithoutPassword = { _id: user._id, name: user.name, email: user.email, phone: user.phone, addreass: user.addreass, photoURL: user.photoURL };
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
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide email, and password' });
    }
    try {
        // Check if the email already exists
        const existingUser = yield auth_model_1.authModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Create a new user
        const user = new auth_model_1.authModel({ name, email, password, phone });
        yield user.save();
        // Create a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, secret_1.jwtSecretKey, { expiresIn: secret_1.tokenExpiresIn });
        const userWithoutPassword = { _id: user._id, name: user.name, email: user.email, phone: user.phone, addreass: user.addreass, photoURL: user.photoURL };
        res.status(201).json({
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
const getUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['authorization'];
        // Decode the token
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (decodedToken) {
            // Extract the userId from the decoded token
            const userId = yield decodedToken.userId;
            var user = yield auth_model_1.authModel.findById(userId).select('-password');
            return (0, resposnse_1.successResposnse)(res, { data: user });
        }
        else {
            console.error('Failed to decode token.');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getUserController = getUserController;
// get all user
const getAllUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all data from the DataModel collection
        const allData = yield auth_model_1.authModel.find().select('-password');
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    }
    catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllUserController = getAllUserController;
// Update user
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, addreass } = req.body;
        if (!name && !email && !phone && !addreass) {
            return res.status(400).json({ error: 'No data provided for update' });
        }
        const token = req.headers['authorization'];
        // Decode the token
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (decodedToken) {
            // Extract the userId from the decoded token
            const userId = yield decodedToken.userId;
            console.log(userId);
            const updatedData = yield auth_model_1.authModel.findByIdAndUpdate(userId, { name, email, phone, addreass }, { new: true });
            if (!updatedData) {
                return res.status(404).json({ error: 'Data not found' });
            }
            res.status(200).json({ message: 'Data updated successfully', updatedData });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateUserController = updateUserController;
// update profile picture
const updateProfilPictureController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = req.file.filename;
        const filePath = "/uploads/user/" + filename;
        const token = req.headers['authorization'];
        // Decode the token
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (decodedToken) {
            // Extract the userId from the decoded token
            const id = yield decodedToken.userId;
            /// old file path
            var oldBanner = yield auth_model_1.authModel.findById(id);
            if (!oldBanner) {
                return res.status(404).json({ error: 'Data not found' });
            }
            const oldFilePath = "public/" + oldBanner.photoURL;
            // Use fs-extra's unlink method to delete the file
            fs_extra_1.default.unlink(oldFilePath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${filePath}:`, err);
                }
                else {
                    console.log(`File ${filePath} deleted successfully.`);
                }
            });
            /// Find the document by ID and update it
            const updatedData = yield auth_model_1.authModel.findByIdAndUpdate(id, { photoURL: filePath }, { new: true });
            // Check if the document exists
            if (!updatedData) {
                return res.status(404).json({ error: 'Data not found' });
            }
            // Respond with the updated data
            res.status(200).json({ message: 'Data updated successfully', updatedData });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateProfilPictureController = updateProfilPictureController;
// ! delete user 
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the ID from the request parameters
        const { id } = req.body;
        console.log(id);
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        var banner = yield auth_model_1.authModel.findById(id);
        const filePath = "public/" + banner.photoURL;
        // Use fs-extra's unlink method to delete the file
        fs_extra_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
            }
            else {
                console.log(`File ${filePath} deleted successfully.`);
            }
        });
        // Find the document by ID and delete it
        const deletedData = yield auth_model_1.authModel.findByIdAndDelete(id);
        // Check if the document exists
        if (!deletedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        // Respond with a success message
        res.status(200).json({ message: 'Data deleted successfully', deletedData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteUserController = deleteUserController;
// ! delete all user
const deleteAllUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Respond with a success message
        var deletedData = yield auth_model_1.authModel.deleteMany();
        // delete all file
        const folderPath = 'public/uploads/user';
        fs_extra_1.default.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(`Error reading directory ${folderPath}:`, err);
                return;
            }
            // Iterate over the files and remove each one
            files.forEach((file) => {
                const filePath = `${folderPath}/${file}`;
                // Use fs-extra's unlink method to delete the file
                fs_extra_1.default.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(`Error deleting file ${filePath}:`, unlinkErr);
                    }
                    else {
                        console.log(`File ${filePath} deleted successfully.`);
                    }
                });
            });
        });
        res.status(200).json({ message: 'Data deleted successfully', deletedData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteAllUserController = deleteAllUserController;
//# sourceMappingURL=auth_controller.js.map