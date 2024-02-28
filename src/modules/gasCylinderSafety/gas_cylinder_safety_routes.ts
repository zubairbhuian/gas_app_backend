import express from "express";
import {  createGasCylinderSafetyController,  deleteGasCylinderSafetyController, getGasCylinderSafetyController, updateGasCylinderSafetyController } from "./gas_cylinder_safety_controller";


const gasCylinderSafetyRoutes = express.Router();

gasCylinderSafetyRoutes.get('/', getGasCylinderSafetyController);
gasCylinderSafetyRoutes.post('/', createGasCylinderSafetyController);
gasCylinderSafetyRoutes.put('/', updateGasCylinderSafetyController);
gasCylinderSafetyRoutes.delete('/', deleteGasCylinderSafetyController);


export default gasCylinderSafetyRoutes;