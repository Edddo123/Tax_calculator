"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calcController_1 = require("../controllers/calcController");
const router = express_1.default.Router();
router.get("/calculator", calcController_1.getCalculator);
router.post("/postIncomeCalculator", calcController_1.postCalculator);
router.post("/personVAT", calcController_1.getPersonVAT);
router.post("/corpVAT", calcController_1.getCorpVAT);
exports.default = router;
