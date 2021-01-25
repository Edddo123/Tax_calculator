"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomecalcSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.IncomecalcSchema = joi_1.default.object({
    residence: joi_1.default.string().min(2).max(30).required(),
    employment: joi_1.default.string().alphanum().min(2).max(30).required(),
    benefits: joi_1.default.string().alphanum().min(2).max(30).required(),
    totalIncome: joi_1.default.number().positive().required(),
    taxType: joi_1.default.string().alphanum().min(2).max(30).required(),
});
