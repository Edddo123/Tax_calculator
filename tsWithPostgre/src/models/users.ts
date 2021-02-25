import db from "../util/db-setup";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class User {
  constructor(
    private firstName: string,
    private lastName: string,
    private username: string,
    private email: string,
    private pword: string,
    private confirmPword: string
  ) {}
  async addUser() {
    //table name in double quotes as user is reserved name
    const hashedPwd = await bcrypt.hash(this.pword, 10);
    return db.query(
      `INSERT INTO "user"(first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5)`,
      [this.firstName, this.lastName, this.email, hashedPwd, this.username]
    );
  }
  static async checkCredentials(email: string, pwd: string) {
    const queryUser = await db.query(
      `SELECT user_id,email, password, username FROM "user" WHERE email = $1`,
      [email]
    );
    if (queryUser.rows.length > 0) { 
      const checkResult = await bcrypt.compare(pwd, queryUser.rows[0].password);
      if (checkResult) {
        const token = jwt.sign(
          {
            username: queryUser.rows[0].username,
            userId: queryUser.rows[0].user_id.toString(),
          },
          "secret",
          
        );
       
        return { token };
      }
    }
    return false;
  }
}
