import express from "express";
import { createFAQSController, deleteFAQSController,  getFAQSController, updateFAQSController } from "./faq_controller";
import verifyToken from "../../middleware/verify_token_middleware";

const faqRoutes = express.Router();

faqRoutes.get('/',verifyToken, getFAQSController);
faqRoutes.post('/',verifyToken, createFAQSController);
faqRoutes.put('/',verifyToken, updateFAQSController);
faqRoutes.delete('/',verifyToken, deleteFAQSController);


export default faqRoutes;