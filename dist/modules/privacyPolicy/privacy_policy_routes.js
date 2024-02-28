"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const privacy_policy_controller_1 = require("./privacy_policy_controller");
const privacyPolicyRoutes = express_1.default.Router();
privacyPolicyRoutes.get('/', privacy_policy_controller_1.getPrivacyPolicyController);
privacyPolicyRoutes.post('/', privacy_policy_controller_1.createPrivacyPolicyController);
privacyPolicyRoutes.put('/', privacy_policy_controller_1.updatePrivacyPolicyController);
privacyPolicyRoutes.delete('/', privacy_policy_controller_1.deletePrivacyPolicyController);
exports.default = privacyPolicyRoutes;
//# sourceMappingURL=privacy_policy_routes.js.map