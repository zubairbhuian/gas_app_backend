"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("./faq_controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const faqRoutes = express_1.default.Router();
faqRoutes.get('/', verify_token_middleware_1.default, faq_controller_1.getFAQSController);
faqRoutes.post('/', verify_token_middleware_1.default, faq_controller_1.createFAQSController);
faqRoutes.put('/', verify_token_middleware_1.default, faq_controller_1.updateFAQSController);
faqRoutes.delete('/', verify_token_middleware_1.default, faq_controller_1.deleteFAQSController);
exports.default = faqRoutes;
//# sourceMappingURL=faq_routes.js.map