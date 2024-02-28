import express from "express";
import {  createGasCylinderSafetyController,  deleteGasCylinderSafetyController, getGasCylinderSafetyController, updateGasCylinderSafetyController } from "./gas_cylinder_safety_controller";
import verifyToken from "../../middleware/verify_token_middleware";

const gasCylinderSafetyRoutes = express.Router();

gasCylinderSafetyRoutes.get('/',verifyToken, getGasCylinderSafetyController);
gasCylinderSafetyRoutes.post('/',verifyToken, createGasCylinderSafetyController);
gasCylinderSafetyRoutes.put('/',verifyToken, updateGasCylinderSafetyController);
gasCylinderSafetyRoutes.delete('/',verifyToken, deleteGasCylinderSafetyController);


export default gasCylinderSafetyRoutes;