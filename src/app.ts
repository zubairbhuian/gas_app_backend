import express, { NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser';
import authRoutes from "./modules/auth/auth_routes";
import { errorResposnse } from "./helper/resposnse";
import todoRoutes from "./modules/todos/todos_routes";
import seedRoutes from "./modules/seeds/seeds_routes";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import faqRoutes from "./modules/faq/faq_routes";
import termsAndConditionsRoutes from "./modules/termsAndConditions/terms_and_conditions_routes";
import privacyPolicyRoutes from "./modules/privacyPolicy/privacy_policy_routes";
import notificationRoutes from "./modules/notification/notification_routes";
import gasCylinderSafetyRoutes from "./modules/gasCylinderSafety/gas_cylinder_safety_routes";
import gasBannerRoutes from "./modules/gas_banner/gas_banner_routes";


const app = express();
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 100, // 1 minute
    max: 5,
    message: "Too many reuests from this IP",
});

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// rouiter
app.use('/', seedRoutes);
app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/faqs', faqRoutes);
app.use('/api/v1/terms_and_conditions', termsAndConditionsRoutes);
app.use('/api/v1/privacy_policy', privacyPolicyRoutes);
app.use('/api/v1/notification', notificationRoutes);
app.use('/api/v1/gas_cylinder_safety', gasCylinderSafetyRoutes);
app.use('/api/v1/gas_banner', gasBannerRoutes);



// client Error handeling
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');
    res.status(404).json({
        success: false,
        message: error.message,
    });
});
// server Error handeling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
});

export default app;
