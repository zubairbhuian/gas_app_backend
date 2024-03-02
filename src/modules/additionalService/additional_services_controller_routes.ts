import express from "express";
import { createAdditionalServiceController, deleteAdditionalServiceController, getAdditionalServiceController, updateAdditionalServiceController } from "./additional_services_controller";
import verifyToken from "../../middleware/verify_token_middleware";

const AdditionalServiceRoutes = express.Router();

AdditionalServiceRoutes.get('/',verifyToken, getAdditionalServiceController);
AdditionalServiceRoutes.post('/',verifyToken, createAdditionalServiceController);
AdditionalServiceRoutes.put('/',verifyToken, updateAdditionalServiceController);
AdditionalServiceRoutes.delete('/',verifyToken, deleteAdditionalServiceController);


export default AdditionalServiceRoutes;