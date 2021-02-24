"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedController_1 = require("../controllers/feedController");
const isAuth_1 = require("../middleware/isAuth");
const router = express_1.default.Router();
router.get("/feedback", feedController_1.getFeed);
router.post("/addFeedback", isAuth_1.isAuth, feedController_1.addFeed);
router.delete("/deleteFeeback", isAuth_1.isAuth, feedController_1.deleteFeed);
exports.default = router;
