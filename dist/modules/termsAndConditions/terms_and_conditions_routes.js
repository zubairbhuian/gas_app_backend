"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const terms_and_conditions_controller_1 = require("./terms_and_conditions_controller");
const termsAndConditionsRoutes = express_1.default.Router();
termsAndConditionsRoutes.get('/', terms_and_conditions_controller_1.getTermsAndConditionsController);
termsAndConditionsRoutes.post('/', terms_and_conditions_controller_1.createTermsAndConditionsController);
termsAndConditionsRoutes.put('/', terms_and_conditions_controller_1.updateTermsAndConditionsController);
termsAndConditionsRoutes.delete('/', terms_and_conditions_controller_1.deleteTermsAndConditionsController);
exports.default = termsAndConditionsRoutes;
//# sourceMappingURL=terms_and_conditions_routes.js.map