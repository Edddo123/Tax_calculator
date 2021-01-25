import express from "express";

import {
  getRecords,
  addPersVAT,
  addCorpVAT,
  addIncome,
} from "../controllers/recordController";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get("/records", isAuth, getRecords);

router.post("/personVATRecord", isAuth, addPersVAT);

router.post("/corpVATRecord", isAuth, addCorpVAT);

router.post("/incomeRecord", isAuth, addIncome);

export default router;
