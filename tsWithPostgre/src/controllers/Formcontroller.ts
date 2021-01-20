import { RequestHandler } from "express";
import { incomeCalculation, VATCalculation } from "../util/taxCalculate";

export const getSignUp: RequestHandler = (req, res, next) => {
  res.render("signup");
};

export const getLogIn: RequestHandler = (req, res, next) => {
  res.render("login");
};

export const getCalculator: RequestHandler = (req, res, next) => {
  res.render("calculator");
};

export const postCalculator: RequestHandler = (req, res, next) => {
  const taxType = "Income";
  const { residence, employment, benefits, totalIncome } = req.body;
  const calculatedIncome = incomeCalculation(
    residence,
    employment,
    benefits,
    totalIncome,
    taxType
  );
  res.json({ response: calculatedIncome });
};

export const getPersonVAT: RequestHandler = (req, res, next) => {
    const {Sales} = req.body
    const calculatedVat = VATCalculation(+Sales)
    console.log
    res.json({ response: calculatedVat });
}

export const getCorpVAT: RequestHandler = (req, res, next) => {
    const {Sales} = req.body
    const calculatedVat = VATCalculation(+Sales)
    res.json({ response: calculatedVat });
}
