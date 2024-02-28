import express from "express";
import {  createPrivacyPolicyController,  deletePrivacyPolicyController,  getPrivacyPolicyController,  updatePrivacyPolicyController } from "./privacy_policy_controller";


const privacyPolicyRoutes = express.Router();

privacyPolicyRoutes.get('/', getPrivacyPolicyController);
privacyPolicyRoutes.post('/', createPrivacyPolicyController);
privacyPolicyRoutes.put('/', updatePrivacyPolicyController);
privacyPolicyRoutes.delete('/', deletePrivacyPolicyController);


export default privacyPolicyRoutes;