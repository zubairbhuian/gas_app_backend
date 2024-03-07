import { Request, Response, NextFunction } from "express";
import { GasBannerMolel } from "./gas_banner_model";
import mongoose from "mongoose";
import fs from 'fs-extra';

// ! get GasBanner
export const getGasBannerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch all data from the DataModel collection
        const allData = await GasBannerMolel.find();
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    } catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// ! create GasBanner
export const createGasBannerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the filename of the uploaded image
        const filename: string = (req.file as Express.Multer.File).filename;
        const filePath: String = "/uploads/banner/" + filename;
        const newData = new GasBannerMolel({
            imgURL: filePath
        });
        // Save the document to the database
        await newData.save();
        res.status(201).json({
            message: 'Data saved successfully!', data: {
                'img': newData.imgURL,
                'id': newData.id
            }
        });
    } catch (e) {
        next(e);
    }
}

// ! update GasBanner
export const updateGasBannerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filename: string = (req.file as Express.Multer.File).filename;
        const filePath: String = "/uploads/banner/" + filename;
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        /// old file path
        var oldBanner = await GasBannerMolel.findById(id);
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
        const updatedData = await GasBannerMolel.findByIdAndUpdate(id, { imgURL: filePath }, { new: true });

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

// ! delete GasBanner
export const deleteGasBannerController = async (req: Request, res: Response, next: NextFunction) => {
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
        var banner = await GasBannerMolel.findById(id);
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
        const deletedData = await GasBannerMolel.findByIdAndDelete(id);

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

// ! delete all GasBanner
export const deleteAllGasBannerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Respond with a success message
        var deletedData = await GasBannerMolel.deleteMany();
        // delete all file
        const folderPath = 'public/uploads/banner';
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