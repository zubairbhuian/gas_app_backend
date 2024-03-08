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
exports.deleteMyProductController = exports.updateMyProductController = exports.createMyProductController = exports.getMyProductController = void 0;
const my_product_model_1 = require("./my_product_model");
const mongoose_1 = __importDefault(require("mongoose"));
const fs_extra_1 = __importDefault(require("fs-extra"));
// ! get MyProductes
const getMyProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all data from the DataModel collection
        const allData = yield my_product_model_1.MyProductMolel.find();
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    }
    catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getMyProductController = getMyProductController;
// ! create MyProduct
const createMyProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from the request body
        const { name, description, weight, price, Refillprice, rating, color } = req.body;
        const filename = req.file.filename;
        const filePath = "/uploads/product/" + filename;
        if (!name || !description || !weight || !price || !Refillprice || !rating || !color) {
            return res.status(400).json({ error: 'name, description ,weight,color,price,rating,condition,img1,img2 and img3 are required fields' });
        }
        // Create a new document using the Mongoose model
        const newData = new my_product_model_1.MyProductMolel({
            name,
            description,
            weight,
            price,
            Refillprice,
            color,
            rating,
            img1: filePath,
        });
        // Save the document to the database
        yield newData.save();
        res.status(201).json({ message: 'Data saved successfully!', data: newData });
    }
    catch (e) {
        next(e);
    }
});
exports.createMyProductController = createMyProductController;
// ! update MyProduct
const updateMyProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, description, weight, price, Refillprice, rating, color } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        // Check if any data to update is provided
        if (!name && !description && !weight && !price && !Refillprice && !rating && !color) {
            return res.status(400).json({ error: 'No data provided for update' });
        }
        // Find the document by ID and update it
        const updatedData = yield my_product_model_1.MyProductMolel.findByIdAndUpdate(id, { name, description, weight, color, price, Refillprice, rating }, { new: true });
        // Check if the document exists
        if (!updatedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        // Respond with the updated data
        res.status(200).json({ message: 'Data updated successfully', updatedData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateMyProductController = updateMyProductController;
// ! delete MyProduct
const deleteMyProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the ID from the request parameters
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        var banner = yield my_product_model_1.MyProductMolel.findById(id);
        const filePath = "public/" + banner.img1;
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
        const deletedData = yield my_product_model_1.MyProductMolel.findByIdAndDelete(id);
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
exports.deleteMyProductController = deleteMyProductController;
//# sourceMappingURL=my_product_controller.js.map