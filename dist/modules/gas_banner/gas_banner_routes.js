"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gas_banner_controller_1 = require("./gas_banner_controller");
const gasBannerRoutes = express_1.default.Router();
gasBannerRoutes.get('/', gas_banner_controller_1.getGasBannerController);
gasBannerRoutes.post('/', gas_banner_controller_1.createGasBannerController);
gasBannerRoutes.put('/', gas_banner_controller_1.updateGasBannerController);
gasBannerRoutes.delete('/', gas_banner_controller_1.deleteGasBannerController);
exports.default = gasBannerRoutes;
//# sourceMappingURL=gas_banner_routes.js.map