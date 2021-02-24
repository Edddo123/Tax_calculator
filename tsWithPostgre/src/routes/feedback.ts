import express from "express";

import { getFeed, addFeed, deleteFeed } from "../controllers/feedController";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get("/feedback", getFeed);

router.post("/addFeedback", isAuth, addFeed);

router.delete("/deleteFeeback", isAuth, deleteFeed);

export default router;
