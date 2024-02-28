"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gas_cylinder_safety_controller_1 = require("./gas_cylinder_safety_controller");
const gasCylinderSafetyRoutes = express_1.default.Router();
gasCylinderSafetyRoutes.get('/', gas_cylinder_safety_controller_1.getGasCylinderSafetyController);
gasCylinderSafetyRoutes.post('/', gas_cylinder_safety_controller_1.createGasCylinderSafetyController);
gasCylinderSafetyRoutes.put('/', gas_cylinder_safety_controller_1.updateGasCylinderSafetyController);
gasCylinderSafetyRoutes.delete('/', gas_cylinder_safety_controller_1.deleteGasCylinderSafetyController);
exports.default = gasCylinderSafetyRoutes;
//# sourceMappingURL=gas_cylinder_safety_routes.js.map