import express from "express";
import { createTermsAndConditionsController, deleteTermsAndConditionsController, getTermsAndConditionsController, updateTermsAndConditionsController } from "./terms_and_conditions_controller";


const termsAndConditionsRoutes = express.Router();

termsAndConditionsRoutes.get('/', getTermsAndConditionsController);
termsAndConditionsRoutes.post('/', createTermsAndConditionsController);
termsAndConditionsRoutes.put('/', updateTermsAndConditionsController);
termsAndConditionsRoutes.delete('/', deleteTermsAndConditionsController);


export default termsAndConditionsRoutes;