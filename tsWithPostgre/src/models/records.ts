import db from "../util/db-setup";


export default class RecordData {
  constructor(
    private taxArray: object,
    private taxType: string,
    private userId: string
  ) {}

  addRecord() {
    const constructedObj = JSON.stringify(this.taxArray);
    return db.query(
      "INSERT INTO record(tax, tax_type, user_id) VALUES ($1, $2, $3)",
      [constructedObj, this.taxType, this.userId]
    );
  }


  static getRecords = (userId:string) => {
   return db.query("SELECT record_id, tax, tax_type, createdat FROM record WHERE user_id = $1", [userId]); //will be modified after adding user
   
  }

  
 static deleteRecord(userId:string, recordId:string) {
    return db.query("DELETE FROM record WHERE record_id = $1 AND user_id = $2",[recordId, userId])
  }
}
