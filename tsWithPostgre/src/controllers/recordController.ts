import { RequestHandler } from "express";
import RecordData from "../models/records";
import { userInfo } from "os";
import { json } from "body-parser";
import { formatData } from "../util/date-format";





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


