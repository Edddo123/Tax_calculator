import { RequestHandler } from "express";
import User from "../models/users"

export const getProfile: RequestHandler = async (req, res, next) => {
  res.render("profile");
};

export const addAvatar:RequestHandler = async (req, res, next) => {

    await User.addAvatar(req.userId)
    res.status(201).json({message: "Image added successfully"})
}
