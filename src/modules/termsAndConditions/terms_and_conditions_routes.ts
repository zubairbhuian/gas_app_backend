import express from "express";
import { createTermsAndConditionsController, deleteTermsAndConditionsController, getTermsAndConditionsController, updateTermsAndConditionsController } from "./terms_and_conditions_controller";
import verifyToken from "../../middleware/verify_token_middleware";

const termsAndConditionsRoutes = express.Router();

termsAndConditionsRoutes.get('/',verifyToken, getTermsAndConditionsController);
termsAndConditionsRoutes.post('/',verifyToken, createTermsAndConditionsController);
termsAndConditionsRoutes.put('/',verifyToken, updateTermsAndConditionsController);
termsAndConditionsRoutes.delete('/',verifyToken, deleteTermsAndConditionsController);


export default termsAndConditionsRoutes;