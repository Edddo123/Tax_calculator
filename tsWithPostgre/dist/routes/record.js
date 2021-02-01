"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recordController_1 = require("../controllers/recordController");
const isAuth_1 = require("../middleware/isAuth");
const router = express_1.default.Router();
router.get("/records", isAuth_1.isAuth, recordController_1.getRecords);
router.post("/personVATRecord", isAuth_1.isAuth, recordController_1.addPersVAT);
router.post("/corpVATRecord", isAuth_1.isAuth, recordController_1.addCorpVAT);
router.post("/incomeRecord", isAuth_1.isAuth, recordController_1.addIncome);
router.delete("/deleteRecord", isAuth_1.isAuth, recordController_1.deleteRecord);
exports.default = router;
