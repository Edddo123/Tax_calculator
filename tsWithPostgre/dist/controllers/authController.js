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
exports.loggedOut = exports.postLogin = exports.postSignUp = exports.getLogIn = exports.getSignUp = exports.myTok = void 0;
const users_1 = __importDefault(require("../models/users"));
const authValidation_1 = require("../middleware/validation/authValidation");
const getSignUp = (req, res, next) => {
    res.render("signup");
};
exports.getSignUp = getSignUp;
const getLogIn = (req, res, next) => {
    res.render("login");
};
exports.getLogIn = getLogIn;
const postSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = authValidation_1.signupSchema.validate(req.body);
        if (error) {
            throw error;
        }
        const { firstName, lastName, username, email, pword, confirmPword } = value;
        const user = new users_1.default(firstName, lastName, username, email, pword, confirmPword);
        yield user.addUser();
        res.redirect("/login");
    }
    catch (err) {
        console.log(err, "postSignup error");
    }
});
exports.postSignUp = postSignUp;
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = authValidation_1.loginSchema.validate(req.body);
    if (error) {
        throw error;
    }
    const getToken = yield users_1.default.checkCredentials(value.loginEmail, value.loginPwd);
    if (getToken) {
        return res.status(200).json({
            token: getToken.token,
            message: "Successful login",
        });
    }
    res.json({ message: "Wrong credentials" });
});
exports.postLogin = postLogin;
const loggedOut = (req, res, next) => {
    res.json({ message: "User successfully logged out" });
};
exports.loggedOut = loggedOut;
