import db from "../util/db-setup";

export default class RecordData {
    constructor(public taxArray:object, public taxType:string) {}
    addRecord() {
        const constructedObj = JSON.stringify(this.taxArray)
        db.query("INSERT INTO record(tax, tax_type) VALUES ($1, $2)", [constructedObj, this.taxType])
    }
}