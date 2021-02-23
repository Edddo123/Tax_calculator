"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatData = void 0;
const date_and_time_1 = __importDefault(require("date-and-time"));
const formatData = (data) => {
    return data.map((taxInfo) => {
        const newDate = date_and_time_1.default.format(taxInfo.createdat, "DD/MM/YY HH:mm");
        return Object.assign(Object.assign({}, taxInfo), { newDate });
    });
};
exports.formatData = formatData;
