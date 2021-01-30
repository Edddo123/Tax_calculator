"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corpVATRecordSchema = exports.personVATRecordSchema = exports.incomeRecordSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.incomeRecordSchema = joi_1.default.object({
    grossIncome: joi_1.default.number().positive().required(),
    incomeTax: joi_1.default.number().positive().required(),
    pensionTax: joi_1.default.number().positive().required(),
    taxType: joi_1.default.string().min(2).max(10).required()
});
exports.personVATRecordSchema = joi_1.default.object({
    salesVAT: joi_1.default.alternatives().try(joi_1.default.number().positive().required(), joi_1.default.string().min(2).max(33).required()),
    taxType: joi_1.default.string().min(2).max(10).required()
});
exports.corpVATRecordSchema = joi_1.default.object({
    salesVAT: joi_1.default.alternatives().try(joi_1.default.number().positive().required(), joi_1.default.string().min(2).max(33).required()),
    taxType: joi_1.default.string().min(2).max(10).required()
});
