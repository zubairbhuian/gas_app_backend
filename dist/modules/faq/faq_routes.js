"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("./faq_controller");
const faqRoutes = express_1.default.Router();
faqRoutes.get('/', faq_controller_1.getFAQSController);
faqRoutes.post('/', faq_controller_1.createFAQSController);
faqRoutes.put('/', faq_controller_1.updateFAQSController);
faqRoutes.delete('/', faq_controller_1.deleteFAQSController);
exports.default = faqRoutes;
//# sourceMappingURL=faq_routes.js.map