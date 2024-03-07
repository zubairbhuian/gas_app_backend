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
exports.deleteGasCylinderSafetyController = exports.updateGasCylinderSafetyController = exports.createGasCylinderSafetyController = exports.getGasCylinderSafetyController = void 0;
const gas_cylinder_safety_model_1 = require("./gas_cylinder_safety_model");
const mongoose_1 = __importDefault(require("mongoose"));
const fs_extra_1 = __importDefault(require("fs-extra"));
// ! get GasCylinderSafety
const getGasCylinderSafetyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all data from the DataModel collection
        const allData = yield gas_cylinder_safety_model_1.GasCylinderSafetyMolel.find();
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    }
    catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getGasCylinderSafetyController = getGasCylinderSafetyController;
// ! create GasCylinderSafety
const createGasCylinderSafetyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from the request body
        const filename = req.file.filename;
        const filePath = "/uploads/gasCS/" + filename;
        const { title, description } = req.body;
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required fields' });
        }
        // Create a new document using the Mongoose model
        const newData = new gas_cylinder_safety_model_1.GasCylinderSafetyMolel({
            title,
            description,
            imgURL: filePath
        });
        // Save the document to the database
        yield newData.save();
        res.status(201).json({ message: 'Data saved successfully!', data: newData });
    }
    catch (e) {
        next(e);
    }
});
exports.createGasCylinderSafetyController = createGasCylinderSafetyController;
// ! update GasCylinderSafety
const updateGasCylinderSafetyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title, description } = req.body;
        //new file name
        const filename = req.file.filename;
        // new file path
        const filePath = "/uploads/gasCS/" + filename;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        // // Check if any data to update is provided
        // if (!title && !description) {
        //     return res.status(400).json({ error: 'No data provided for update' });
        // }
        /// old file path
        var oldBanner = yield gas_cylinder_safety_model_1.GasCylinderSafetyMolel.findById(id);
        if (!oldBanner) {
            return res.status(404).json({ error: 'Data not found' });
        }
        const oldFilePath = "public/" + oldBanner.imgURL;
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
        const updatedData = yield gas_cylinder_safety_model_1.GasCylinderSafetyMolel.findByIdAndUpdate(id, { imgURL: filePath, title, description }, { new: true });
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateGasCylinderSafetyController = updateGasCylinderSafetyController;
// ! delete GasCylinderSafety
const deleteGasCylinderSafetyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        var banner = yield gas_cylinder_safety_model_1.GasCylinderSafetyMolel.findById(id);
        const filePath = "public/" + banner.imgURL;
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
        const deletedData = yield gas_cylinder_safety_model_1.GasCylinderSafetyMolel.findByIdAndDelete(id);
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
exports.deleteGasCylinderSafetyController = deleteGasCylinderSafetyController;
//# sourceMappingURL=gas_cylinder_safety_controller.js.map