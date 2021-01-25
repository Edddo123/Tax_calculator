"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.get("/signup", authController_1.getSignUp);
router.get("/login", authController_1.getLogIn);
router.post("/postsignup", authController_1.postSignUp);
router.post("/postlogin", authController_1.postLogin);
exports.default = router;
