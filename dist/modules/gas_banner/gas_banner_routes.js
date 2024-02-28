"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gas_banner_controller_1 = require("./gas_banner_controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const gasBannerRoutes = express_1.default.Router();
gasBannerRoutes.get('/', verify_token_middleware_1.default, gas_banner_controller_1.getGasBannerController);
gasBannerRoutes.post('/', verify_token_middleware_1.default, gas_banner_controller_1.createGasBannerController);
gasBannerRoutes.put('/', verify_token_middleware_1.default, gas_banner_controller_1.updateGasBannerController);
gasBannerRoutes.delete('/', verify_token_middleware_1.default, gas_banner_controller_1.deleteGasBannerController);
exports.default = gasBannerRoutes;
//# sourceMappingURL=gas_banner_routes.js.map