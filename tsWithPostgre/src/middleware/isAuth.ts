import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const isAuth: RequestHandler = (req, res, next) => {
    try {
  const authHeader:any = req.get("Authorization") || req.query.tok
    if (!authHeader) {
      return res.redirect( 401, "/login");
    }
    const token = authHeader.split(" ")[1];
    let decodedToken: any;

    decodedToken = jwt.verify(token, "secret");

    if (!decodedToken) {
      return res.redirect("/login");
    }
    //my property doesnt exist on req object interface so we need to add it
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};
