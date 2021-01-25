import express from "express";
import {
  getSignUp,
  getLogIn,
  postSignUp,
  postLogin,
} from "../controllers/authController";

const router = express.Router();

router.get("/signup", getSignUp);

router.get("/login", getLogIn);

router.post("/postsignup", postSignUp);

router.post("/postlogin", postLogin);

export default router;
