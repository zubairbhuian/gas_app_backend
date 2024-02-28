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
exports.deletePrivacyPolicyController = exports.updatePrivacyPolicyController = exports.createPrivacyPolicyController = exports.getPrivacyPolicyController = void 0;
const privacy_policy_model_1 = require("./privacy_policy_model");
const mongoose_1 = __importDefault(require("mongoose"));
// ! get Privacy Policy
const getPrivacyPolicyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all data from the DataModel collection
        const allData = yield privacy_policy_model_1.PrivacyPolicyMolel.find();
        // Respond with the fetched data
        res.status(200).json({ message: 'Sucessfuly Get the data', data: allData });
    }
    catch (e) {
        next(e);
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getPrivacyPolicyController = getPrivacyPolicyController;
// ! create PrivacyPolicy
const createPrivacyPolicyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from the request body
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required fields' });
        }
        // Create a new document using the Mongoose model
        const newData = new privacy_policy_model_1.PrivacyPolicyMolel({
            title,
            description
        });
        // Save the document to the database
        yield newData.save();
        res.status(201).json({ message: 'Data saved successfully!', data: newData });
    }
    catch (e) {
        next(e);
    }
});
exports.createPrivacyPolicyController = createPrivacyPolicyController;
// ! update PrivacyPolicy
const updatePrivacyPolicyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title, description } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Id is required fields' });
        }
        // Check if the ID is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        // Check if any data to update is provided
        if (!title && !description) {
            return res.status(400).json({ error: 'No data provided for update' });
        }
        // Find the document by ID and update it
        const updatedData = yield privacy_policy_model_1.PrivacyPolicyMolel.findByIdAndUpdate(id, { title, description }, { new: true });
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
exports.updatePrivacyPolicyController = updatePrivacyPolicyController;
// ! delete PrivacyPolicy
const deletePrivacyPolicyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const deletedData = yield privacy_policy_model_1.PrivacyPolicyMolel.findByIdAndDelete(id);
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
exports.deletePrivacyPolicyController = deletePrivacyPolicyController;
//# sourceMappingURL=privacy_policy_controller.js.map