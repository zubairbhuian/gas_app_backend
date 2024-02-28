import express from "express";
import { createNotificationController,  deleteNotificationController, getNotificationController, updateNotificationController } from "./notification_controller";
import verifyToken from "../../middleware/verify_token_middleware";

const notificationRoutes = express.Router();

notificationRoutes.get('/',verifyToken, getNotificationController);
notificationRoutes.post('/',verifyToken, createNotificationController);
notificationRoutes.put('/',verifyToken, updateNotificationController);
notificationRoutes.delete('/',verifyToken, deleteNotificationController);


export default notificationRoutes;