import { RequestHandler } from "express";
import { incomeCalculation, VATCalculation } from "../util/taxCalculate";
import db from "../util/db-setup";

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
  const { sales } = req.body;
  const calculatedVat = VATCalculation(+sales);
  res.json({ response: calculatedVat });
};

export const getCorpVAT: RequestHandler = (req, res, next) => {
  const { sales } = req.body;
  const calculatedVat = VATCalculation(+sales);
  res.json({ response: calculatedVat });
};

export const getRecords: RequestHandler = (req, res, next) => {
  res.render("records");
};

export const addPersVAT: RequestHandler = (req, res, next) => {
  const { salesVAT, taxType } = req.body;
  const dbVAT = JSON.stringify({salesVAT})

  db.query("INSERT INTO record(tax, tax_type) VALUES ($1, $2)", [dbVAT, taxType])
  res.json({ message: "Record created" });
};

export const addCorpVAT: RequestHandler = (req, res, next) => {
  const { salesVAT, taxType } = req.body;
  const dbVAT = JSON.stringify({salesVAT})
  db.query("INSERT INTO record(tax, tax_type) VALUES ($1, $2)", [dbVAT, taxType])
  res.json({ message: "Record created" });
};

export const addIncome: RequestHandler = (req, res, next) => {
  const {taxableIncome} = req.body
  const { grossIncome, incomeTax, pensionTax, taxType } =taxableIncome
  const dbVAT = JSON.stringify({grossIncome, incomeTax, pensionTax})
  console.log(dbVAT, 'ye thats it')
  db.query("INSERT INTO record(tax, tax_type) VALUES ($1, $2)", [dbVAT, taxType])
  res.json({ message: "Record created" });
};
