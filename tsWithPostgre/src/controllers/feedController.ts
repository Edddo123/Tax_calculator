import { RequestHandler } from "express";
import { myTok } from "./authController";
import Feedback from "../models/feedback";

export const getFeed: RequestHandler = async (req, res, next) => {
  try {
    const data = await Feedback.getFeedbacks();
    res.render("feedback", { feedData: data.rows });
  } catch (err) {
    console.log(err);
  }
};

export const addFeed: RequestHandler = async (req, res, next) => {
  try {
    const { content, rating } = req.body;
    const feed = new Feedback(content, req.userId, rating);
    await feed.addFeedback();
    res.json({ message: "feed added" });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFeed: RequestHandler = async (req, res, next) => {
  const feedId = req.query.id;
  try {
    const result = await Feedback.deleteFeedback(feedId, req.userId);
    if (result.rowCount === 0) {
      return res
        .status(409)
        .json({ message: "You can only delete feeds you have created" });
    }
    return res.status(200).json({ message: "Successfully deleted post" , deletedPostCount: result.rowCount});
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Feed could not be deleted, try again later"});
  }
};
