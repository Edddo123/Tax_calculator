import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const isAuth: RequestHandler = (req, res, next) => {
  try {
    const authHeader: any = req.get("Authorization") || req.query.tok;
    if (!authHeader) {
      return res.status(401).json({ message: "no token" });
    }
    const token = authHeader.split(" ")[1];
    let decodedToken: any;

    decodedToken = jwt.verify(token, "secret");

    if (!decodedToken) {
      return res.status(401).json({ message: "Wrong token" });
    }
    //my property doesnt exist on req object interface so we need to add it
    req.userId = decodedToken.userId;
    req.username = decodedToken.username;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: err });
  }
};
