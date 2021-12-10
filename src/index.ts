import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import router from "./routes/router";
import passport from "passport";
import session from "express-session";

const app = express();
require("./database");
require("./passport/google-oauth20");

app.set("port", 3000);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ //objeto como configuración de esta sesión
    secret: "anything", //especie de texto secreto para poerd estar seguro *nombre aleatorio
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(router)

app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))