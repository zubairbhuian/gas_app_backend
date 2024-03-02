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
exports.deleteAdditionalServiceController = exports.updateAdditionalServiceController = exports.createAdditionalServiceController = exports.getAdditionalServiceController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const additional_service_model_1 = require("./additional_service_model");
// ! get AdditionalServicees
const getAdditionalServiceController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all data from the DataModel collection
        const allData = yield additional_service_model_1.AdditionalService.find();
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    }
    catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAdditionalServiceController = getAdditionalServiceController;
// ! create AdditionalService
const createAdditionalServiceController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from the request body
        const { title, description, price } = req.body;
        if (!title || !description || !price) {
            return res.status(400).json({ error: 'Title ,description and price are required fields' });
        }
        // Create a new document using the Mongoose model
        const newData = new additional_service_model_1.AdditionalService({
            title,
            description,
            price
        });
        // Save the document to the database
        yield newData.save();
        res.status(201).json({ message: 'Data saved successfully!', data: newData });
    }
    catch (e) {
        next(e);
    }
});
exports.createAdditionalServiceController = createAdditionalServiceController;
// ! update AdditionalService
const updateAdditionalServiceController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title, description, price } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        // Check if any data to update is provided
        if (!title && !description && !price) {
            return res.status(400).json({ error: 'No data provided for update' });
        }
        // Find the document by ID and update it
        const updatedData = yield additional_service_model_1.AdditionalService.findByIdAndUpdate(id, { title, description, price }, { new: true });
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
exports.updateAdditionalServiceController = updateAdditionalServiceController;
// ! delete AdditionalService
const deleteAdditionalServiceController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Find the document by ID and delete it
        const deletedData = yield additional_service_model_1.AdditionalService.findByIdAndDelete(id);
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
exports.deleteAdditionalServiceController = deleteAdditionalServiceController;
//# sourceMappingURL=additional_services_controller.js.map