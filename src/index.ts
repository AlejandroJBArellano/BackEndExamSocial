import express from "express";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
require("./database");

app.set("port", 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))