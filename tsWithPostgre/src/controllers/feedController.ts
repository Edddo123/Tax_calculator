import { RequestHandler } from "express";
import { myTok } from "./authController";
import Feedback from "../models/feedback"

export const getFeed: RequestHandler = async(req, res, next) => {
  try{
  const data = await Feedback.getFeedbacks()
  res.render("feedback", {feedData: data.rows});
}catch(err) {
  console.log(err)
}
};

export const addFeed: RequestHandler = async(req, res, next) => {
  try{
  const {content, rating} = req.body
  const feed = new Feedback(content, req.userId, rating)
  await feed.addFeedback()
  res.json({message:'feed added'})
}catch(err) {
  console.log(err)
}
}