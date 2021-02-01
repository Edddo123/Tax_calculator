"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_setup_1 = __importDefault(require("../util/db-setup"));
class RecordData {
    constructor(taxArray, taxType, userId) {
        this.taxArray = taxArray;
        this.taxType = taxType;
        this.userId = userId;
    }
    addRecord() {
        const constructedObj = JSON.stringify(this.taxArray);
        return db_setup_1.default.query("INSERT INTO record(tax, tax_type, user_id) VALUES ($1, $2, $3)", [constructedObj, this.taxType, this.userId]);
    }
    static deleteRecord(userId, recordId) {
        return db_setup_1.default.query("DELETE FROM record WHERE record_id = $1 AND user_id = $2", [recordId, userId]);
    }
}
exports.default = RecordData;
RecordData.getRecords = (userId) => {
    return db_setup_1.default.query("SELECT record_id, tax, tax_type, createdat FROM record WHERE user_id = $1", [userId]);
};
