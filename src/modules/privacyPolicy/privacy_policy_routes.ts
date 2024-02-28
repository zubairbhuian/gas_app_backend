import express from "express";
import {  createPrivacyPolicyController,  deletePrivacyPolicyController,  getPrivacyPolicyController,  updatePrivacyPolicyController } from "./privacy_policy_controller";
import verifyToken from "../../middleware/verify_token_middleware";

const privacyPolicyRoutes = express.Router();

privacyPolicyRoutes.get('/',verifyToken, getPrivacyPolicyController);
privacyPolicyRoutes.post('/',verifyToken, createPrivacyPolicyController);
privacyPolicyRoutes.put('/',verifyToken, updatePrivacyPolicyController);
privacyPolicyRoutes.delete('/',verifyToken, deletePrivacyPolicyController);


export default privacyPolicyRoutes;