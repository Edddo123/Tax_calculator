import Joi from "joi";

export const IncomecalcSchema = Joi.object({
  residence: Joi.string().min(2).max(30).required(),
  employment: Joi.string().alphanum().min(2).max(30).required(),
  benefits: Joi.string().alphanum().min(2).max(30).required(),
  totalIncome: Joi.number().positive().required(),
  taxType: Joi.string().alphanum().min(2).max(30).required(),
});
