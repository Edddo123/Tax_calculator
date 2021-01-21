"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIncome = exports.addCorpVAT = exports.addPersVAT = exports.getRecords = exports.getCorpVAT = exports.getPersonVAT = exports.postCalculator = exports.getCalculator = exports.getLogIn = exports.getSignUp = void 0;
const taxCalculate_1 = require("../util/taxCalculate");
const db_setup_1 = __importDefault(require("../util/db-setup"));
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
    const { sales } = req.body;
    const calculatedVat = taxCalculate_1.VATCalculation(+sales);
    res.json({ response: calculatedVat });
};
exports.getPersonVAT = getPersonVAT;
const getCorpVAT = (req, res, next) => {
    const { sales } = req.body;
    const calculatedVat = taxCalculate_1.VATCalculation(+sales);
    res.json({ response: calculatedVat });
};
exports.getCorpVAT = getCorpVAT;
const getRecords = (req, res, next) => {
    res.render("records");
};
exports.getRecords = getRecords;
const addPersVAT = (req, res, next) => {
    const { salesVAT, taxType } = req.body;
    const dbVAT = JSON.stringify({ salesVAT });
    db_setup_1.default.query("INSERT INTO record(tax, tax_type) VALUES ($1, $2)", [dbVAT, taxType]);
    res.json({ message: "Record created" });
};
exports.addPersVAT = addPersVAT;
const addCorpVAT = (req, res, next) => {
    const { salesVAT, taxType } = req.body;
    const dbVAT = JSON.stringify({ salesVAT });
    db_setup_1.default.query("INSERT INTO record(tax, tax_type) VALUES ($1, $2)", [dbVAT, taxType]);
    res.json({ message: "Record created" });
};
exports.addCorpVAT = addCorpVAT;
const addIncome = (req, res, next) => {
    const { taxableIncome } = req.body;
    const { grossIncome, incomeTax, pensionTax, taxType } = taxableIncome;
    const dbVAT = JSON.stringify({ grossIncome, incomeTax, pensionTax });
    console.log(dbVAT, 'ye thats it');
    db_setup_1.default.query("INSERT INTO record(tax, tax_type) VALUES ($1, $2)", [dbVAT, taxType]);
    res.json({ message: "Record created" });
};
exports.addIncome = addIncome;
