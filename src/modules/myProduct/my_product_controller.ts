import { Request, Response, NextFunction } from "express";
import { MyProductMolel } from "./my_product_model";
import mongoose from "mongoose";

// ! get MyProductes
export const getMyProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch all data from the DataModel collection
        const allData = await MyProductMolel.find();
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    } catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// ! create MyProduct
export const createMyProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract data from the request body
        const { name, description, weight, price, rating, condition, img1, img2, img3 } = req.body;
        if (!name || !description || !weight || !price || !rating || !condition || !img1 || !img2 || !img3) {
            return res.status(400).json({ error: 'name, description ,weight,price,rating,condition,img1,img2 and img3 are required fields' });
        }
        // Create a new document using the Mongoose model
        const newData = new MyProductMolel({
            name,
            description,
            weight,
            price,
            rating,
            condition,
            img1,
            img2,
            img3,
        });
        // Save the document to the database
        await newData.save();
        res.status(201).json({ message: 'Data saved successfully!', data: newData });
    } catch (e) {
        next(e);
    }
}

// ! update MyProduct
export const updateMyProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, name, description, weight, price, rating, condition, img1, img2, img3 } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }


        // Check if any data to update is provided
        if (!name && !description && !weight && !price && !rating && !condition && !img1 && !img2 && !img3) {
            return res.status(400).json({ error: 'No data provided for update' });
        }
        // Find the document by ID and update it
        const updatedData = await MyProductMolel.findByIdAndUpdate(id, { name, description, weight, price, rating, condition, img1, img2, img3 }, { new: true });

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

// ! delete MyProduct
export const deleteMyProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        // Find the document by ID and delete it
        const deletedData = await MyProductMolel.findByIdAndDelete(id);

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