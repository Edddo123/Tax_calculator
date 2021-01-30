import Joi, { number, string } from "joi";


export const incomeRecordSchema = Joi.object({
    grossIncome: Joi.number().positive().required(),
    incomeTax: Joi.number().positive().required(),
    pensionTax: Joi.number().positive().required(),
    taxType: Joi.string().min(2).max(10).required()
  });

  export const personVATRecordSchema = Joi.object({
    salesVAT: Joi.alternatives().try( Joi.number().positive().required(), Joi.string().min(2).max(33).required()),
    taxType: Joi.string().min(2).max(10).required()
  });

  export const corpVATRecordSchema = Joi.object({
    salesVAT: Joi.alternatives().try( Joi.number().positive().required(), Joi.string().min(2).max(33).required()),
    taxType: Joi.string().min(2).max(10).required()
  });