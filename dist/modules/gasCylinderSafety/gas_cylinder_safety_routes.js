"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gas_cylinder_safety_controller_1 = require("./gas_cylinder_safety_controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const gasCylinderSafetyRoutes = express_1.default.Router();
gasCylinderSafetyRoutes.get('/', verify_token_middleware_1.default, gas_cylinder_safety_controller_1.getGasCylinderSafetyController);
gasCylinderSafetyRoutes.post('/', verify_token_middleware_1.default, gas_cylinder_safety_controller_1.createGasCylinderSafetyController);
gasCylinderSafetyRoutes.put('/', verify_token_middleware_1.default, gas_cylinder_safety_controller_1.updateGasCylinderSafetyController);
gasCylinderSafetyRoutes.delete('/', verify_token_middleware_1.default, gas_cylinder_safety_controller_1.deleteGasCylinderSafetyController);
exports.default = gasCylinderSafetyRoutes;
//# sourceMappingURL=gas_cylinder_safety_routes.js.map