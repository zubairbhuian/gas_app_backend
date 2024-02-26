import express from "express";
import seedController from "./seeds_controller";
import verifyToken from "../../middleware/verify_token_middleware";


const seedRoutes =express.Router();

seedRoutes.get('/', verifyToken,seedController);


export default seedRoutes;