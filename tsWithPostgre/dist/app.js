"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const form_1 = __importDefault(require("./routes/form"));
const app = express_1.default();
app.set('view engine', 'ejs');
app.set('views', 'dist/views');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(form_1.default);
app.listen(3000);
