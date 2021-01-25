"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_setup_1 = __importDefault(require("./util/db-setup"));
const record_1 = __importDefault(require("./routes/record"));
const auth_1 = __importDefault(require("./routes/auth"));
const calculator_1 = __importDefault(require("./routes/calculator"));
const app = express_1.default();
app.set("view engine", "ejs");
app.set("views", "dist/views");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(auth_1.default);
app.use(record_1.default);
app.use(calculator_1.default);
db_setup_1.default.connect()
    .then(() => {
    console.log("connected to database");
    app.listen(3001);
})
    .catch((err) => {
    console.log(err, "system crashed");
});
