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
exports.deleteAllGasBannerController = exports.deleteGasBannerController = exports.updateGasBannerController = exports.createGasBannerController = exports.getGasBannerController = void 0;
const gas_banner_model_1 = require("./gas_banner_model");
const mongoose_1 = __importDefault(require("mongoose"));
const fs_extra_1 = __importDefault(require("fs-extra"));
// ! get GasBanner
const getGasBannerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all data from the DataModel collection
        const allData = yield gas_banner_model_1.GasBannerMolel.find();
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    }
    catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getGasBannerController = getGasBannerController;
// ! create GasBanner
const createGasBannerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the filename of the uploaded image
        const filename = req.file.filename;
        const filePath = "/uploads/banner/" + filename;
        const newData = new gas_banner_model_1.GasBannerMolel({
            imgURL: filePath
        });
        // Save the document to the database
        yield newData.save();
        res.status(201).json({
            message: 'Data saved successfully!', data: {
                'img': newData.imgURL,
                'id': newData.id
            }
        });
    }
    catch (e) {
        next(e);
    }
});
exports.createGasBannerController = createGasBannerController;
// ! update GasBanner
const updateGasBannerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = req.file.filename;
        const filePath = "/uploads/banner/" + filename;
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        /// old file path
        var oldBanner = yield gas_banner_model_1.GasBannerMolel.findById(id);
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
        const updatedData = yield gas_banner_model_1.GasBannerMolel.findByIdAndUpdate(id, { imgURL: filePath }, { new: true });
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
exports.updateGasBannerController = updateGasBannerController;
// ! delete GasBanner
const deleteGasBannerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        var banner = yield gas_banner_model_1.GasBannerMolel.findById(id);
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
        const deletedData = yield gas_banner_model_1.GasBannerMolel.findByIdAndDelete(id);
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
}); //deleteAllGasBannerController
exports.deleteGasBannerController = deleteGasBannerController;
// ! delete all GasBanner
const deleteAllGasBannerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Respond with a success message
        var deletedData = yield gas_banner_model_1.GasBannerMolel.deleteMany();
        const folderPath = 'public/uploads/banner';
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
exports.deleteAllGasBannerController = deleteAllGasBannerController;
//# sourceMappingURL=gas_banner_controller.js.map