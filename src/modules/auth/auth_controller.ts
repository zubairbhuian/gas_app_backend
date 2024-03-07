import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authModel } from "./auth_model";
import { jwtSecretKey, tokenExpiresIn } from "../../utils/secret"
import { json } from "body-parser";
import { successResposnse } from "../../helper/resposnse";
import fs from 'fs-extra';
import mongoose from "mongoose";



export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'name, email, and password is required' });
    }
    try {
        // Check if the user exists
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is correct
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: tokenExpiresIn });
        const userWithoutPassword = { _id: user._id, name: user.name, email: user.email, phone: user.phone, addreass: user.addreass, photoURL: user.photoURL };
        res.status(200).json({
            message: 'Login successful',
            data: userWithoutPassword,
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: 'server error'
        });
    }
}
// signUp
export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide email, and password' });
    }
    try {
        // Check if the email already exists
        const existingUser = await authModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Create a new user
        const user = new authModel({ name, email, password, phone });
        await user.save();
        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: tokenExpiresIn });
        const userWithoutPassword = { _id: user._id, name: user.name, email: user.email, phone: user.phone, addreass: user.addreass, photoURL: user.photoURL };
        res.status(201).json({
            message: 'Signup successful',
            data: userWithoutPassword,
            token
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'server error'
        });
    }

}
// forget password
export const forgetPassController = (req: Request, res: Response, next: NextFunction) => {
    res.send('forget');
}
// change password
export const changePassController = (req: Request, res: Response, next: NextFunction) => {
    res.send('change');
}
// otp
export const sendOTPController = (req: Request, res: Response, next: NextFunction) => {
    res.send('otp');
}
// get user
export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        // Decode the token
        const decodedToken: any = jwt.decode(token);
        if (decodedToken) {
            // Extract the userId from the decoded token
            const userId = await decodedToken.userId;
            var user = await authModel.findById(userId).select('-password');
            return successResposnse(res, { data: user })
        } else {
            console.error('Failed to decode token.');
        }
    } catch (error) {
        next(error);
    }
}

// get all user
export const getAllUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch all data from the DataModel collection
        const allData = await authModel.find().select('-password');
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    } catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Update user
export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, phone, addreass } = req.body;
        if (!name && !email && !phone && !addreass) {
            return res.status(400).json({ error: 'No data provided for update' });
        }
        const token = req.headers['authorization'];
        // Decode the token
        const decodedToken: any = jwt.decode(token);
        if (decodedToken) {
            // Extract the userId from the decoded token
            const userId = await decodedToken.userId;
            console.log(userId);

            const updatedData = await authModel.findByIdAndUpdate(userId, { name, email, phone, addreass }, { new: true }).select('-password');
            if (!updatedData) {
                return res.status(404).json({ error: 'Data not found' });
            }
            res.status(200).json({ message: 'Data updated successfully', updatedData });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
}


// update profile picture
export const updateProfilPictureController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filename: string = (req.file as Express.Multer.File).filename;
        const filePath: String = "/uploads/user/" + filename;
        const token = req.headers['authorization'];
        // Decode the token
        const decodedToken: any = jwt.decode(token);
        if (decodedToken) {
            // Extract the userId from the decoded token
            const id = await decodedToken.userId;
            /// old file path
            var oldBanner = await authModel.findById(id);
            if (!oldBanner) {
                return res.status(404).json({ error: 'Data not found' });
            }
            const oldFilePath = "public/" + oldBanner.photoURL;
            // Use fs-extra's unlink method to delete the file
            fs.unlink(oldFilePath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${filePath}:`, err);
                } else {
                    console.log(`File ${filePath} deleted successfully.`);
                }
            });
            /// Find the document by ID and update it
            const updatedData = await authModel.findByIdAndUpdate(id, { photoURL: filePath }, { new: true }).select('-password');

            // Check if the document exists
            if (!updatedData) {
                return res.status(404).json({ error: 'Data not found' });
            }
            // Respond with the updated data
            res.status(200).json({ message: 'Data updated successfully', updatedData });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
}


// ! delete user 
export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.body;
        console.log(id);

        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        var banner = await authModel.findById(id);
        const filePath = "public/" + banner.photoURL;
        // Use fs-extra's unlink method to delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
            } else {
                console.log(`File ${filePath} deleted successfully.`);
            }
        });
        // Find the document by ID and delete it
        const deletedData = await authModel.findByIdAndDelete(id);

        // Check if the document exists
        if (!deletedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        // Respond with a success message
        res.status(200).json({ message: 'Data deleted successfully', deletedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// ! delete all user
export const deleteAllUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Respond with a success message
        var deletedData = await authModel.deleteMany();
        // delete all file
        const folderPath = 'public/uploads/user';
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(`Error reading directory ${folderPath}:`, err);
                return;
            }
            // Iterate over the files and remove each one
            files.forEach((file) => {
                const filePath = `${folderPath}/${file}`;
                // Use fs-extra's unlink method to delete the file
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(`Error deleting file ${filePath}:`, unlinkErr);
                    } else {
                        console.log(`File ${filePath} deleted successfully.`);
                    }
                });
            });
        });
        res.status(200).json({ message: 'Data deleted successfully', deletedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

