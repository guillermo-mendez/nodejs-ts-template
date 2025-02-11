"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
function responseHandler(data, message) {
    return { statusCode: 200, message, data };
}
exports.responseHandler = responseHandler;
