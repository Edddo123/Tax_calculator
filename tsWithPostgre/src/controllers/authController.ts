import { RequestHandler } from "express";
import User from "../models/users";
import {
  loginSchema,
  signupSchema,
} from "../middleware/validation/authValidation";

export let myTok: string;

export const getSignUp: RequestHandler = (req, res, next) => {
  res.render("signup", { myTok: myTok });
};

export const getLogIn: RequestHandler = (req, res, next) => {

  res.render("login", { myTok: myTok });
};

export const postSignUp: RequestHandler = async (req, res, next) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      throw error;
    }

    const { firstName, lastName, username, email, pword, confirmPword } = value;

    const user = new User(
      firstName,
      lastName,
      username,
      email,
      pword,
      confirmPword
    );
    await user.addUser();
    res.redirect("/login");
  } catch (err) {
    console.log(err, "postSignup error");
  }
};

export const postLogin: RequestHandler = async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    throw error;
  }
  const getToken = await User.checkCredentials(
    value.loginEmail,
    value.loginPwd
  );
  if (getToken) {
    myTok = getToken;
    return res.status(200).json({ token: myTok, message: "Successful login" });
  }
  res.json({ message: "Wrong credentials" });
};

export const loggedOut: RequestHandler = (req, res, next) => {
  myTok = "";
  res.json({message:'User successfully logged out'})
}
