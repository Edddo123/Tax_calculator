import express from "express";

import {
  getFeed,
  addFeed
} from "../controllers/feedController";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get("/feedback", getFeed)

router.post("/addFeedback",isAuth, addFeed)

export default router;
