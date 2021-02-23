import express from "express";
import {
  getSignUp,
  getLogIn,
  postSignUp,
  postLogin,
  loggedOut,
  // refreshToken,
} from "../controllers/authController";

const router = express.Router();

router.get("/signup", getSignUp);

router.get("/login", getLogIn);

router.post("/postsignup", postSignUp);

// router.post("/token", refreshToken);

router.post("/postlogin", postLogin);

router.get("/logOut", loggedOut);

export default router;
