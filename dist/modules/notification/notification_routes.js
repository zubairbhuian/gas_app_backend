"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("./notification_controller");
const notificationRoutes = express_1.default.Router();
notificationRoutes.get('/', notification_controller_1.getNotificationController);
notificationRoutes.post('/', notification_controller_1.createNotificationController);
notificationRoutes.put('/', notification_controller_1.updateNotificationController);
notificationRoutes.delete('/', notification_controller_1.deleteNotificationController);
exports.default = notificationRoutes;
//# sourceMappingURL=notification_routes.js.map