import { RequestHandler } from "express";
import { incomeCalculation, VATCalculation } from "../util/taxCalculate";
import {
  IncomecalcSchema,
  personVATSchema,
  corpVATSchema,
} from "../middleware/validation/calcValidation";

export const getCalculator: RequestHandler = (req, res, next) => {
  res.render("calculator");
};

export const postCalculator: RequestHandler = (req, res, next) => {
  const taxType = "Income";
  const { error, value } = IncomecalcSchema.validate(req.body);
  if (error) {
    throw error;
  }
  const calculatedIncome = incomeCalculation(
    value.residence,
    value.employment,
    value.benefits,
    value.totalIncome,
    taxType
  );
  res.json({ response: calculatedIncome });
};

export const getPersonVAT: RequestHandler = (req, res, next) => {
  const { error, value } = personVATSchema.validate(req.body);
  if (error) throw error;
  const calculatedVat = VATCalculation(value.sales);
  res.json({ response: calculatedVat });
};

export const getCorpVAT: RequestHandler = (req, res, next) => {
  const { error, value } = corpVATSchema.validate(req.body);
  if (error) throw error;
  const calculatedVat = VATCalculation(value.sales);
  res.json({ response: calculatedVat });
};
