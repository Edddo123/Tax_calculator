import express from "express";
import path from "path";
import bodyParser from "body-parser";
import db from "./util/db-setup";
import dotenv from "dotenv";

import recordRoutes from "./routes/record";
import authRoutes from "./routes/auth";
import calcRoutes from "./routes/calculator";
import feedRoutes from "./routes/feedback";
import socket from "./socket";
const app = express();
app.set("view engine", "ejs");
app.set("views", "dist/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config({
  path: path.join(path.dirname(require.main!.filename), ".env"),
});
app.use(express.static(path.join(__dirname, "public")));

app.use(authRoutes);
app.use(recordRoutes);
app.use(calcRoutes);
app.use(feedRoutes);

db.connect()
  .then(() => {
    console.log("connected to database");
    const server = app.listen(3001);
    let io = socket(server);
  })
  .catch((err) => {
    console.log(err, "system crashed");
  });
