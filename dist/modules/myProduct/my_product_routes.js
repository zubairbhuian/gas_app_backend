"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const my_product_controller_1 = require("./my_product_controller");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/product'); // Set the destination directory
        },
        filename: function (req, file, cb) {
            // Generate a unique filename by adding a timestamp
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    fileFilter: function (req, file, cb) {
        // Accept only PNG and JPG images
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else {
            cb(new Error('Only PNG and JPG images are allowed'));
        }
    }
});
const MyProductRoutes = express_1.default.Router();
MyProductRoutes.get('/', my_product_controller_1.getMyProductController);
MyProductRoutes.post('/', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), my_product_controller_1.createMyProductController);
MyProductRoutes.put('/', my_product_controller_1.updateMyProductController);
MyProductRoutes.delete('/', my_product_controller_1.deleteMyProductController);
exports.default = MyProductRoutes;
//# sourceMappingURL=my_product_routes.js.map