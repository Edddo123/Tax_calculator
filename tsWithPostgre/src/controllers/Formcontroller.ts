import { RequestHandler } from "express";
import { incomeCalculation, VATCalculation } from "../util/taxCalculate";
import db from "../util/db-setup";
import RecordData from "../models/records";
import User from "../models/users";
import { userInfo } from "os";
import { json } from "body-parser";
import {formatData} from "../util/date-format"


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

export const getRecords: RequestHandler = async (req, res, next) => {
  try {
    const data = await RecordData.getRecords();
   let formattedData = formatData(data.rows)
   res.render('records', {
     data:formattedData
   })
  } catch (err) {
    console.log(err);
  }
};

export const addPersVAT: RequestHandler = async (req, res, next) => {
  try {
    const { salesVAT, taxType } = req.body;
    const record = new RecordData({ salesVAT }, taxType, req.userId);
    await record.addRecord();
    res.json({ message: "Record created" });
  } catch (err) {
    console.log(err);
  }
};

export const addCorpVAT: RequestHandler = async (req, res, next) => {
  try {
    const { salesVAT, taxType } = req.body;
    const record = new RecordData({ salesVAT }, taxType, req.userId);
    await record.addRecord();
    res.json({ message: "Record created" });
  } catch (err) {
    console.log(err);
  }
};

export const addIncome: RequestHandler = async (req, res, next) => {
  try {
    const { taxableIncome } = req.body;
    const { grossIncome, incomeTax, pensionTax, taxType } = taxableIncome;
    const record = new RecordData(
      { grossIncome, incomeTax, pensionTax },
      taxType,
      req.userId
    );
    await record.addRecord();
    res.json({ message: "Record created" });
  } catch (err) {
    console.log(err);
  }
};

export const postSignUp: RequestHandler = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      pword,
      confirmPword,
    } = req.body;

    const user = new User(
      firstName,
      lastName,
      username,
      email,
      pword,
      confirmPword
    );
    await user.addUser();
    res.redirect("/login");
  } catch (err) {
    console.log(err, "postSignup error");
  }
};

export const postLogin: RequestHandler = async (req, res, next) => {
  const { loginEmail, loginPwd } = req.body;
  const getToken = await User.checkCredentials(loginEmail, loginPwd)
  if(getToken) {
    const token = getToken
    return res.status(200).json({token:token, message:"Successful login"})
  }
  res.json({message:'Wrong credentials'})
};
