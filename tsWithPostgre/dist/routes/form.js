"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Formcontroller_1 = require("../controllers/Formcontroller");
const router = express_1.default.Router();
router.get('/', Formcontroller_1.getForms);
exports.default = router;
