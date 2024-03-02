"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const additional_services_controller_1 = require("./additional_services_controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const AdditionalServiceRoutes = express_1.default.Router();
AdditionalServiceRoutes.get('/', verify_token_middleware_1.default, additional_services_controller_1.getAdditionalServiceController);
AdditionalServiceRoutes.post('/', verify_token_middleware_1.default, additional_services_controller_1.createAdditionalServiceController);
AdditionalServiceRoutes.put('/', verify_token_middleware_1.default, additional_services_controller_1.updateAdditionalServiceController);
AdditionalServiceRoutes.delete('/', verify_token_middleware_1.default, additional_services_controller_1.deleteAdditionalServiceController);
exports.default = AdditionalServiceRoutes;
//# sourceMappingURL=additional_services_controller_routes.js.map