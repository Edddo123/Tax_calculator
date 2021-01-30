import { RequestHandler } from "express";
import RecordData from "../models/records";
import { userInfo } from "os";
import { json } from "body-parser";
import { formatData } from "../util/date-format";
import {
  incomeRecordSchema,
  personVATRecordSchema,
  corpVATRecordSchema
} from "../middleware/validation/recordValidation";

export const getRecords: RequestHandler = async (req, res, next) => {
  try {
    const data = await RecordData.getRecords();
    let formattedData = formatData(data.rows);
    res.render("records", {
      data: formattedData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addPersVAT: RequestHandler = async (req, res, next) => {
  try {
    const { error, value } = personVATRecordSchema.validate(req.body);
    if(error) throw error
    const record = new RecordData({ salesVAT: value.salesVAT }, value.taxType, req.userId);
    await record.addRecord();
    res.json({ message: "Record created" });
  } catch (err) {
    console.log(err);
  }
};

export const addCorpVAT: RequestHandler = async (req, res, next) => {
  try {
    const { error, value } = corpVATRecordSchema.validate(req.body);
    if(error) throw error
    const record = new RecordData({ salesVAT: value.salesVAT }, value.taxType, req.userId);
    await record.addRecord();
    res.json({ message: "Record created" });
  } catch (err) {
    console.log(err);
  }
};

export const addIncome: RequestHandler = async (req, res, next) => {
  try {
    const { error, value } = incomeRecordSchema.validate(req.body.taxableIncome);
    if (error) throw error;
    const { grossIncome, incomeTax, pensionTax, taxType } = value;
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
