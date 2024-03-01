"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth_routes"));
const todos_routes_1 = __importDefault(require("./modules/todos/todos_routes"));
const seeds_routes_1 = __importDefault(require("./modules/seeds/seeds_routes"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const faq_routes_1 = __importDefault(require("./modules/faq/faq_routes"));
const terms_and_conditions_routes_1 = __importDefault(require("./modules/termsAndConditions/terms_and_conditions_routes"));
const privacy_policy_routes_1 = __importDefault(require("./modules/privacyPolicy/privacy_policy_routes"));
const notification_routes_1 = __importDefault(require("./modules/notification/notification_routes"));
const gas_cylinder_safety_routes_1 = __importDefault(require("./modules/gasCylinderSafety/gas_cylinder_safety_routes"));
const gas_banner_routes_1 = __importDefault(require("./modules/gas_banner/gas_banner_routes"));
const path_1 = __importDefault(require("path"));
const my_product_routes_1 = __importDefault(require("./modules/myProduct/my_product_routes"));
const app = (0, express_1.default)();
// Serve static files from the 'public' directory
const publicPath = path_1.default.join(__dirname, '../public');
app.use(express_1.default.static(publicPath));
// Parse JSON bodies
app.use(body_parser_1.default.json());
// Parse URL-encoded bodies
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 100, // 1 minute
    max: 5,
    message: "Too many reuests from this IP",
});
app.use(rateLimiter);
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// rouiter
app.use('/', seeds_routes_1.default);
app.use('/api/v1/todos', todos_routes_1.default);
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/faqs', faq_routes_1.default);
app.use('/api/v1/terms_and_conditions', terms_and_conditions_routes_1.default);
app.use('/api/v1/privacy_policy', privacy_policy_routes_1.default);
app.use('/api/v1/notification', notification_routes_1.default);
app.use('/api/v1/gas_cylinder_safety', gas_cylinder_safety_routes_1.default);
app.use('/api/v1/gas_banner', gas_banner_routes_1.default);
app.use('/api/v1/my_product', my_product_routes_1.default);
// // Define a static route to serve uploaded images
// // app.use('/images', express.static(__dirname + '/public/uploads'));
// app.use( express.static('public'));
// client Error handeling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status(404).json({
        success: false,
        message: error.message,
    });
});
// server Error handeling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map