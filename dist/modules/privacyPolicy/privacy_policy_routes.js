"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const privacy_policy_controller_1 = require("./privacy_policy_controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const privacyPolicyRoutes = express_1.default.Router();
privacyPolicyRoutes.get('/', verify_token_middleware_1.default, privacy_policy_controller_1.getPrivacyPolicyController);
privacyPolicyRoutes.post('/', verify_token_middleware_1.default, privacy_policy_controller_1.createPrivacyPolicyController);
privacyPolicyRoutes.put('/', verify_token_middleware_1.default, privacy_policy_controller_1.updatePrivacyPolicyController);
privacyPolicyRoutes.delete('/', verify_token_middleware_1.default, privacy_policy_controller_1.deletePrivacyPolicyController);
exports.default = privacyPolicyRoutes;
//# sourceMappingURL=privacy_policy_routes.js.map