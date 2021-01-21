"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Formcontroller_1 = require("../controllers/Formcontroller");
const router = express_1.default.Router();
router.get('/signup', Formcontroller_1.getSignUp);
router.get('/login', Formcontroller_1.getLogIn);
router.get('/calculator', Formcontroller_1.getCalculator);
router.post("/postIncomeCalculator", Formcontroller_1.postCalculator);
router.post('/personVAT', Formcontroller_1.getPersonVAT);
router.post('/corpVAT', Formcontroller_1.getCorpVAT);
router.get('/records', Formcontroller_1.getRecords);
router.post('/personVATRecord', Formcontroller_1.addPersVAT);
router.post('/corpVATRecord', Formcontroller_1.addCorpVAT);
router.post('/incomeRecord', Formcontroller_1.addIncome);
exports.default = router;
