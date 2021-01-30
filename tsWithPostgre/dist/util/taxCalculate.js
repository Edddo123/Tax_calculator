"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VATCalculation = exports.incomeCalculation = void 0;
const incomeCalculation = (residence, employment, benefits, totalIncome, taxType) => {
    let grossIncome = +(totalIncome / 0.784).toFixed(2);
    let pensionTax = +(grossIncome * 0.02).toFixed(2);
    const incomeTax = +((grossIncome - pensionTax) * 0.2).toFixed(2);
    return { grossIncome, incomeTax, pensionTax, taxType };
};
exports.incomeCalculation = incomeCalculation;
const VATCalculation = (Sales) => {
    const VATpayable = +(Sales * 0.18).toFixed(2);
    if (Sales <= 100000) {
        return { message: "you have no obligation to pay VAT" };
    }
    else {
        return { response: VATpayable };
    }
};
exports.VATCalculation = VATCalculation;
