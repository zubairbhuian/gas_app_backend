import express from "express";
import { createNotificationController,  deleteNotificationController, getNotificationController, updateNotificationController } from "./notification_controller";


const notificationRoutes = express.Router();

notificationRoutes.get('/', getNotificationController);
notificationRoutes.post('/', createNotificationController);
notificationRoutes.put('/', updateNotificationController);
notificationRoutes.delete('/', deleteNotificationController);


export default notificationRoutes;