"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_setup_1 = __importDefault(require("./util/db-setup"));
const dotenv_1 = __importDefault(require("dotenv"));
const record_1 = __importDefault(require("./routes/record"));
const auth_1 = __importDefault(require("./routes/auth"));
const calculator_1 = __importDefault(require("./routes/calculator"));
const feedback_1 = __importDefault(require("./routes/feedback"));
const socket = require("./socket");
const app = express_1.default();
app.set("view engine", "ejs");
app.set("views", "dist/views");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
dotenv_1.default.config({
    path: path_1.default.join(path_1.default.dirname(require.main.filename), ".env"),
});
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(auth_1.default);
app.use(record_1.default);
app.use(calculator_1.default);
app.use(feedback_1.default);
db_setup_1.default.connect()
    .then(() => {
    console.log("connected to database");
    const server = app.listen(3001);
    let io = socket.init(server);
})
    .catch((err) => {
    console.log(err, "system crashed");
});
