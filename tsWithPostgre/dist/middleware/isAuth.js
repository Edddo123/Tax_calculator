"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization") || req.query.tok;
        if (!authHeader) {
            return res.redirect(401, "/login");
        }
        const token = authHeader.split(" ")[1];
        let decodedToken;
        decodedToken = jsonwebtoken_1.default.verify(token, "secret");
        if (!decodedToken) {
            return res.redirect("/login");
        }
        req.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        return res.redirect("/login");
    }
};
exports.isAuth = isAuth;
