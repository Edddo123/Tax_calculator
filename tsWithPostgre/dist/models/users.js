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
const db_setup_1 = __importDefault(require("../util/db-setup"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User {
    constructor(firstName, lastName, username, email, pword, confirmPword, avatar) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.pword = pword;
        this.confirmPword = confirmPword;
        this.avatar = avatar;
    }
    addUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPwd = yield bcrypt_1.default.hash(this.pword, 10);
            return db_setup_1.default.query(`INSERT INTO "user"(first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5)`, [this.firstName, this.lastName, this.email, hashedPwd, this.username]);
        });
    }
    static checkCredentials(email, pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryUser = yield db_setup_1.default.query(`SELECT user_id,email, password, username FROM "user" WHERE email = $1`, [email]);
            if (queryUser.rows.length > 0) {
                const checkResult = yield bcrypt_1.default.compare(pwd, queryUser.rows[0].password);
                if (checkResult) {
                    const token = jsonwebtoken_1.default.sign({
                        username: queryUser.rows[0].username,
                        userId: queryUser.rows[0].user_id.toString(),
                    }, "secret");
                    return { token };
                }
            }
            return false;
        });
    }
    static addAvatar(userId, imageUrl = "") {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_setup_1.default.query('UPDATE "user" SET image_url=$1 WHERE user_id=$2', [
                imageUrl,
                userId,
            ]);
        });
    }
}
exports.default = User;
