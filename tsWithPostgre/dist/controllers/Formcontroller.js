"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.postSignUp = exports.addIncome = exports.addCorpVAT = exports.addPersVAT = exports.getRecords = exports.getCorpVAT = exports.getPersonVAT = exports.postCalculator = exports.getCalculator = exports.getLogIn = exports.getSignUp = void 0;
const taxCalculate_1 = require("../util/taxCalculate");
const records_1 = __importDefault(require("../models/records"));
const users_1 = __importDefault(require("../models/users"));
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
const getRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield records_1.default.getRecords();
        res.render("records", {
            data: data.rows,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRecords = getRecords;
const addPersVAT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { salesVAT, taxType } = req.body;
        const record = new records_1.default({ salesVAT }, taxType);
        yield record.addRecord();
        res.json({ message: "Record created" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.addPersVAT = addPersVAT;
const addCorpVAT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { salesVAT, taxType } = req.body;
        const record = new records_1.default({ salesVAT }, taxType);
        yield record.addRecord();
        res.json({ message: "Record created" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.addCorpVAT = addCorpVAT;
const addIncome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taxableIncome } = req.body;
        const { grossIncome, incomeTax, pensionTax, taxType } = taxableIncome;
        const record = new records_1.default({ grossIncome, incomeTax, pensionTax }, taxType);
        yield record.addRecord();
        res.json({ message: "Record created" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.addIncome = addIncome;
const postSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, email, pword, confirmPword, } = req.body;
        const user = new users_1.default(firstName, lastName, username, email, pword, confirmPword);
        yield user.addUser();
        res.redirect("/login");
    }
    catch (err) {
        console.log(err, "postSignup error");
    }
});
exports.postSignUp = postSignUp;
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginEmail, loginPwd } = req.body;
    const getToken = yield users_1.default.checkCredentials(loginEmail, loginPwd);
    if (getToken) {
        const token = getToken;
        return res.status(200).json({ token: token, message: "Successful login" });
    }
    res.json({ message: 'Wrong credentials' });
});
exports.postLogin = postLogin;
