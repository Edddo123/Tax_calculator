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
exports.addAvatar = exports.getProfile = void 0;
const users_1 = __importDefault(require("../models/users"));
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("profile");
});
exports.getProfile = getProfile;
const addAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_1.default.addAvatar(req.userId);
    res.status(201).json({ message: "Image added successfully" });
});
exports.addAvatar = addAvatar;
