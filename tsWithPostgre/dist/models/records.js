"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_setup_1 = __importDefault(require("../util/db-setup"));
class RecordData {
    constructor(taxArray, taxType) {
        this.taxArray = taxArray;
        this.taxType = taxType;
    }
    static getRecords() {
        return db_setup_1.default.query("SELECT tax, tax_type, createdat FROM record");
    }
    addRecord() {
        const constructedObj = JSON.stringify(this.taxArray);
        return db_setup_1.default.query("INSERT INTO record(tax, tax_type) VALUES ($1, $2)", [constructedObj, this.taxType]);
    }
}
exports.default = RecordData;
