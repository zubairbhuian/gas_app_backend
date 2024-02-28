import express from "express";
import { createGasBannerController,  deleteGasBannerController, getGasBannerController, updateGasBannerController} from "./gas_banner_controller";


const gasBannerRoutes = express.Router();

gasBannerRoutes.get('/', getGasBannerController);
gasBannerRoutes.post('/', createGasBannerController);
gasBannerRoutes.put('/', updateGasBannerController);
gasBannerRoutes.delete('/', deleteGasBannerController);


export default gasBannerRoutes;