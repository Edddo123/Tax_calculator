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
exports.deleteRecord = exports.addIncome = exports.addCorpVAT = exports.addPersVAT = exports.getRecords = void 0;
const records_1 = __importDefault(require("../models/records"));
const date_format_1 = require("../util/date-format");
const recordValidation_1 = require("../middleware/validation/recordValidation");
const getRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield records_1.default.getRecords(req.userId);
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
        const { error, value } = recordValidation_1.personVATRecordSchema.validate(req.body);
        if (error)
            throw error;
        const record = new records_1.default({ salesVAT: value.salesVAT }, value.taxType, req.userId);
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
        console.log("here");
        const { error, value } = recordValidation_1.corpVATRecordSchema.validate(req.body);
        if (error)
            throw error;
        const record = new records_1.default({ salesVAT: value.salesVAT }, value.taxType, req.userId);
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
        const { error, value } = recordValidation_1.incomeRecordSchema.validate(req.body.taxableIncome);
        if (error)
            throw error;
        const { grossIncome, incomeTax, pensionTax, taxType } = value;
        const record = new records_1.default({ grossIncome, incomeTax, pensionTax }, taxType, req.userId);
        yield record.addRecord();
        res.json({ message: "Record created" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.addIncome = addIncome;
const deleteRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = recordValidation_1.recordIdSchema.validate(req.query.recordId);
    if (error)
        throw error;
    records_1.default.deleteRecord(req.userId, value);
    res.json({ message: "Record deleted" });
});
exports.deleteRecord = deleteRecord;
