import db from "../util/db-setup";
import { RequestHandler } from "express";
import User from "../models/users";
import {
  loginSchema,
  signupSchema,
} from "../middleware/validation/authValidation";
import jwt from "jsonwebtoken";
export let myTok: string;
// export let myRefreshTok: string;

export const getSignUp: RequestHandler = (req, res, next) => {
  res.render("signup");
};

export const getLogIn: RequestHandler = (req, res, next) => {
  res.render("login");
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
    myTok = getToken.token;
    return res.status(200).json({
      token: myTok,
      message: "Successful login",
    });
  }
  res.json({ message: "Wrong credentials" });
};

export const loggedOut: RequestHandler = (req, res, next) => {
  res.json({ message: "User successfully logged out" });
};

// export const refreshToken: RequestHandler = (req, res, next) => {
//   const { refToken } = req.body;
//   const myRefTok = db.query("SELECT * FROM refresh_token WHERE tokens=$1", [
//     refToken,
//   ]);
//   if (!myRefTok) {
//     throw new Error("Wrong refresh token");
//   }
//   const token = jwt.sign(
//     {
//       email: queryUser.rows[0].email,
//       userId: queryUser.rows[0].user_id.toString(),
//     },
//     "secret",
//     { expiresIn: "10s" }
//   );
//   res.json({ token });
// };
