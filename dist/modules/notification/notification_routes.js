"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("./notification_controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const notificationRoutes = express_1.default.Router();
notificationRoutes.get('/', verify_token_middleware_1.default, notification_controller_1.getNotificationController);
notificationRoutes.post('/', verify_token_middleware_1.default, notification_controller_1.createNotificationController);
notificationRoutes.put('/', verify_token_middleware_1.default, notification_controller_1.updateNotificationController);
notificationRoutes.delete('/', verify_token_middleware_1.default, notification_controller_1.deleteNotificationController);
exports.default = notificationRoutes;
//# sourceMappingURL=notification_routes.js.map