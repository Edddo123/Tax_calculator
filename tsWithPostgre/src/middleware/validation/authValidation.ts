import Joi from "joi";

export const signupSchema = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30).required(),
  lastName: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } }).trim().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  pword: Joi.string()
    .min(5)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]"))
    .required()
    .trim(),
  confirmPword: Joi.ref("pword"),
});

export const loginSchema = Joi.object({
  loginEmail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } }).trim().required(),
  loginPwd: Joi.string()
  .min(5)
  .max(30)
  .pattern(new RegExp("^[a-zA-Z0-9]"))
  .required()
  .trim()
})
