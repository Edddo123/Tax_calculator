import db from "../util/db-setup";

export default class RecordData {
    constructor(private taxArray:object, private taxType:string) {}

    static getRecords() {
       return db.query("SELECT tax, tax_type, createdat FROM record") //will be modified after adding user
    }

    addRecord() {
        const constructedObj = JSON.stringify(this.taxArray)
       return db.query("INSERT INTO record(tax, tax_type) VALUES ($1, $2)", [constructedObj, this.taxType])
    }
}