import db from "../util/db-setup";

export default class Feedback {
  constructor(
    private content: string,
    private userId: string,
    private rating: number
  ) {}

  addFeedback() {
    return db.query(
      "INSERT INTO feedback(content,user_id, rating) VALUES ($1, $2, $3) RETURNING feedback_id",
      [this.content, this.userId, this.rating]
    );
  }

  static getFeedbacks() {
    return db.query(
      `SELECT a.feedback_id, a.content, a.rating, a.createdat, b.username FROM feedback as a JOIN "user" as b USING(user_id)`
    ); 
  }

  static deleteFeedback(feedId: unknown, userId: string) {
    return db.query(
      `DELETE FROM feedback WHERE feedback_id=$1 AND user_id=$2`,
      [feedId, userId]
    );
  }
}
