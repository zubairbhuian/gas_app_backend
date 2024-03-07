import { Request, Response, NextFunction } from "express";
import { GasCylinderSafetyMolel } from "./gas_cylinder_safety_model";
import mongoose from "mongoose";
import fs from 'fs-extra';
// ! get GasCylinderSafety
export const getGasCylinderSafetyController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch all data from the DataModel collection
        const allData = await GasCylinderSafetyMolel.find();
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    } catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// ! create GasCylinderSafety
export const createGasCylinderSafetyController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract data from the request body
        const filename: string = (req.file as Express.Multer.File).filename;
        const filePath: String = "/uploads/gasCS/" + filename;
        const { title, description } = req.body;
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required fields' });
        }
        // Create a new document using the Mongoose model
        const newData = new GasCylinderSafetyMolel({
            title,
            description,
            imgURL: filePath
        });
        // Save the document to the database
        await newData.save();
        res.status(201).json({ message: 'Data saved successfully!', data: newData });
    } catch (e) {
        next(e);
    }
}

// ! update GasCylinderSafety
export const updateGasCylinderSafetyController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, title, description } = req.body;
        //new file name
        const filename: string = (req.file as Express.Multer.File).filename;
        // new file path
        const filePath: String = "/uploads/gasCS/" + filename;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        // // Check if any data to update is provided
        // if (!title && !description) {
        //     return res.status(400).json({ error: 'No data provided for update' });
        // }
        /// old file path
        var oldBanner = await GasCylinderSafetyMolel.findById(id);
        if (!oldBanner) {
            return res.status(404).json({ error: 'Data not found' });
        }
        const oldFilePath = "public/" + oldBanner.imgURL;
        // Use fs-extra's unlink method to delete the file
        fs.unlink(oldFilePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
            } else {
                console.log(`File ${filePath} deleted successfully.`);
            }
        });
        /// Find the document by ID and update it
        const updatedData = await GasCylinderSafetyMolel.findByIdAndUpdate(id, { imgURL: filePath, title, description }, { new: true });

        // Check if the document exists
        if (!updatedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        // Respond with the updated data
        res.status(200).json({ message: 'Data updated successfully', updatedData });
        // Check if the document exists
        if (!updatedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        // Respond with the updated data
        res.status(200).json({ message: 'Data updated successfully', updatedData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
}

// ! delete GasCylinderSafety
export const deleteGasCylinderSafetyController = async (req: Request, res: Response, next: NextFunction) => {
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
        var banner = await GasCylinderSafetyMolel.findById(id);
        const filePath = "public/" + banner.imgURL;
        // Use fs-extra's unlink method to delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
            } else {
                console.log(`File ${filePath} deleted successfully.`);
            }
        });
        // Find the document by ID and delete it
        const deletedData = await GasCylinderSafetyMolel.findByIdAndDelete(id);

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