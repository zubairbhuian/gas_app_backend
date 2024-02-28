import express from "express";
import { createGasBannerController,  deleteGasBannerController, getGasBannerController, updateGasBannerController} from "./gas_banner_controller";
import verifyToken from "../../middleware/verify_token_middleware";


const gasBannerRoutes = express.Router();

gasBannerRoutes.get('/',verifyToken, getGasBannerController);
gasBannerRoutes.post('/',verifyToken, createGasBannerController);
gasBannerRoutes.put('/',verifyToken, updateGasBannerController);
gasBannerRoutes.delete('/',verifyToken, deleteGasBannerController);


export default gasBannerRoutes;