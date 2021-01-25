import express from "express";
import {
  getCalculator,
  postCalculator,
  getPersonVAT,
  getCorpVAT,
} from "../controllers/calcController";

const router = express.Router();

router.get("/calculator", getCalculator);

router.post("/postIncomeCalculator", postCalculator);

router.post("/personVAT", getPersonVAT);

router.post("/corpVAT", getCorpVAT);

export default router;
