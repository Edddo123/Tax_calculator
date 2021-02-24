"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeed = exports.addFeed = exports.getFeed = void 0;
const feedback_1 = __importDefault(require("../models/feedback"));
const getFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield feedback_1.default.getFeedbacks();
        res.render("feedback", { feedData: data.rows });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getFeed = getFeed;
const addFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, rating } = req.body;
        const feed = new feedback_1.default(content, req.userId, rating);
        yield feed.addFeedback();
        res.json({ message: "feed added" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.addFeed = addFeed;
const deleteFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const feedId = req.query.id;
    try {
        const result = yield feedback_1.default.deleteFeedback(feedId, req.userId);
        if (result.rowCount === 0) {
            return res
                .status(409)
                .json({ message: "You can only delete feeds you have created" });
        }
        return res.status(200).json({ message: "Successfully deleted post", deletedPostCount: result.rowCount });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Feed could not be deleted, try again later" });
    }
});
exports.deleteFeed = deleteFeed;
