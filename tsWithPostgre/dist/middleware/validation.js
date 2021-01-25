"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object({
    firstName: joi_1.default.string().alphanum().min(2).max(30).required(),
    lastName: joi_1.default.string().alphanum().min(2).max(30).required(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } }).trim().required(),
    username: joi_1.default.string().alphanum().min(3).max(30).required(),
    pword: joi_1.default.string()
        .min(5)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z0-9]"))
        .required()
        .trim(),
    confirmPword: joi_1.default.ref("pword"),
});
