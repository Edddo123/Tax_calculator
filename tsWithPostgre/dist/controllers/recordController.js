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
exports.addIncome = exports.addCorpVAT = exports.addPersVAT = exports.getRecords = void 0;
const records_1 = __importDefault(require("../models/records"));
const date_format_1 = require("../util/date-format");
const getRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield records_1.default.getRecords();
        let formattedData = date_format_1.formatData(data.rows);
        res.render("records", {
            data: formattedData,
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
        const record = new records_1.default({ salesVAT }, taxType, req.userId);
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
        const record = new records_1.default({ salesVAT }, taxType, req.userId);
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
        const record = new records_1.default({ grossIncome, incomeTax, pensionTax }, taxType, req.userId);
        yield record.addRecord();
        res.json({ message: "Record created" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.addIncome = addIncome;
