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
            return res.status(401).json({ message: "no token" });
        }
        const token = authHeader.split(" ")[1];
        let decodedToken;
        decodedToken = jsonwebtoken_1.default.verify(token, "secret");
        if (!decodedToken) {
            return res.status(401).json({ message: "Wrong token" });
        }
        req.userId = decodedToken.userId;
        req.username = decodedToken.username;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ message: err });
    }
};
exports.isAuth = isAuth;
