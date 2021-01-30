import db from "../util/db-setup";


export default class RecordData {
  constructor(
    private taxArray: object,
    private taxType: string,
    private userId: string
  ) {}

  static getRecords = (userId:string) => {
   return db.query("SELECT tax, tax_type, createdat FROM record WHERE user_id = $1", [userId]); //will be modified after adding user
   
  }

  addRecord() {
    const constructedObj = JSON.stringify(this.taxArray);
    return db.query(
      "INSERT INTO record(tax, tax_type, user_id) VALUES ($1, $2, $3)",
      [constructedObj, this.taxType, this.userId]
    );
  }
}
