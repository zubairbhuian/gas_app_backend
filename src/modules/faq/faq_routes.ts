import express from "express";
import { createFAQSController, deleteFAQSController,  getFAQSController, updateFAQSController } from "./faq_controller";


const faqRoutes = express.Router();

faqRoutes.get('/', getFAQSController);
faqRoutes.post('/', createFAQSController);
faqRoutes.put('/', updateFAQSController);
faqRoutes.delete('/', deleteFAQSController);


export default faqRoutes;