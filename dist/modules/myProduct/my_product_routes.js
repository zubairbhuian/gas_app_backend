"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const my_product_controller_1 = require("./my_product_controller");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define the destination and filename for uploaded files
const storage = multer_1.default.diskStorage({
    destination: 'public/uploads/product',
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
const MyProductRoutes = express_1.default.Router();
MyProductRoutes.get('/', my_product_controller_1.getMyProductController);
MyProductRoutes.post('/', upload.single('image'), my_product_controller_1.createMyProductController);
MyProductRoutes.put('/', my_product_controller_1.updateMyProductController);
MyProductRoutes.delete('/', my_product_controller_1.deleteMyProductController);
exports.default = MyProductRoutes;
//# sourceMappingURL=my_product_routes.js.map