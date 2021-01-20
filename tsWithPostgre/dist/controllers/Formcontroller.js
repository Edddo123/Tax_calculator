"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorpVAT = exports.getPersonVAT = exports.postCalculator = exports.getCalculator = exports.getLogIn = exports.getSignUp = void 0;
const taxCalculate_1 = require("../util/taxCalculate");
const getSignUp = (req, res, next) => {
    res.render("signup");
};
exports.getSignUp = getSignUp;
const getLogIn = (req, res, next) => {
    res.render("login");
};
exports.getLogIn = getLogIn;
const getCalculator = (req, res, next) => {
    res.render("calculator");
};
exports.getCalculator = getCalculator;
const postCalculator = (req, res, next) => {
    const taxType = "Income";
    const { residence, employment, benefits, totalIncome } = req.body;
    const calculatedIncome = taxCalculate_1.incomeCalculation(residence, employment, benefits, totalIncome, taxType);
    res.json({ response: calculatedIncome });
};
exports.postCalculator = postCalculator;
const getPersonVAT = (req, res, next) => {
    const { Sales } = req.body;
    const calculatedVat = taxCalculate_1.VATCalculation(+Sales);
    console.log;
    res.json({ response: calculatedVat });
};
exports.getPersonVAT = getPersonVAT;
const getCorpVAT = (req, res, next) => {
    const { Sales } = req.body;
    const calculatedVat = taxCalculate_1.VATCalculation(+Sales);
    res.json({ response: calculatedVat });
};
exports.getCorpVAT = getCorpVAT;
