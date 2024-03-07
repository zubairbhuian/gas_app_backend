"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gas_cylinder_safety_controller_1 = require("./gas_cylinder_safety_controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define the destination and filename for uploaded files
const storage = multer_1.default.diskStorage({
    destination: 'public/uploads/gasCS',
    filename: function (req, file, cb) {
        // Ensure the file extension is .png or .jpg
        const allowedExtensions = ['.png', '.jpg'];
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            // Create a unique filename
            const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
            // Set filename to be unique + original extension
            cb(null, file.fieldname + '_' + uniqueSuffix + ext);
        }
        else {
            cb(new Error('Only .png and .jpg files are allowed!'), null);
        }
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const gasCylinderSafetyRoutes = express_1.default.Router();
gasCylinderSafetyRoutes.get('/', verify_token_middleware_1.default, gas_cylinder_safety_controller_1.getGasCylinderSafetyController);
gasCylinderSafetyRoutes.post('/', verify_token_middleware_1.default, upload.single('image'), gas_cylinder_safety_controller_1.createGasCylinderSafetyController);
gasCylinderSafetyRoutes.put('/', verify_token_middleware_1.default, upload.single('image'), gas_cylinder_safety_controller_1.updateGasCylinderSafetyController);
gasCylinderSafetyRoutes.delete('/', verify_token_middleware_1.default, gas_cylinder_safety_controller_1.deleteGasCylinderSafetyController);
exports.default = gasCylinderSafetyRoutes;
//# sourceMappingURL=gas_cylinder_safety_routes.js.map