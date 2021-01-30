"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorpVAT = exports.getPersonVAT = exports.postCalculator = exports.getCalculator = void 0;
const taxCalculate_1 = require("../util/taxCalculate");
const calcValidation_1 = require("../middleware/validation/calcValidation");
const getCalculator = (req, res, next) => {
    res.render("calculator");
};
exports.getCalculator = getCalculator;
const postCalculator = (req, res, next) => {
    const taxType = 'Income';
    const { error, value } = calcValidation_1.IncomecalcSchema.validate(req.body);
    if (error) {
        throw error;
    }
    const calculatedIncome = taxCalculate_1.incomeCalculation(value.residence, value.employment, value.benefits, value.totalIncome, taxType);
    res.json({ response: calculatedIncome });
};
exports.postCalculator = postCalculator;
const getPersonVAT = (req, res, next) => {
    const { error, value } = calcValidation_1.personVATSchema.validate(req.body);
    if (error)
        throw error;
    const calculatedVat = taxCalculate_1.VATCalculation(value.sales);
    res.json({ response: calculatedVat });
};
exports.getPersonVAT = getPersonVAT;
const getCorpVAT = (req, res, next) => {
    const { error, value } = calcValidation_1.corpVATSchema.validate(req.body);
    if (error)
        throw error;
    const calculatedVat = taxCalculate_1.VATCalculation(value.sales);
    res.json({ response: calculatedVat });
};
exports.getCorpVAT = getCorpVAT;
