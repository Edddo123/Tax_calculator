"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_setup_1 = __importDefault(require("../util/db-setup"));
class Feedback {
    constructor(content, userId, rating) {
        this.content = content;
        this.userId = userId;
        this.rating = rating;
    }
    addFeedback() {
        return db_setup_1.default.query("INSERT INTO feedback(content,user_id, rating) VALUES ($1, $2, $3) RETURNING feedback_id", [this.content, this.userId, this.rating]);
    }
    static getFeedbacks() {
        return db_setup_1.default.query(`SELECT a.feedback_id, a.content, a.rating, a.createdat, b.username FROM feedback as a JOIN "user" as b USING(user_id)`);
    }
    static deleteFeedback(feedId, userId) {
        return db_setup_1.default.query(`DELETE FROM feedback WHERE feedback_id=$1 AND user_id=$2`, [feedId, userId]);
    }
}
exports.default = Feedback;
