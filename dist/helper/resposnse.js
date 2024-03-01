"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResposnse = exports.errorResposnse = void 0;
const errorResposnse = (res, { statusCode = 500, message = "Internal Server Error" } // Fixed typo here
) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorResposnse = errorResposnse;
const successResposnse = (res, { statusCode = 200, message = "Success", data = {} }) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};
exports.successResposnse = successResposnse;
//# sourceMappingURL=resposnse.js.map