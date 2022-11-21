import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import {protect} from "./modules/auth";
import {createNewUser, signin} from "./handlers/user";
import {updateProduct} from "./handlers/product";

import {errorHandler} from "./modules/middleware";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
  setTimeout(() => {
    next(new Error("hello"));
  }, 1);
});

app.use("/api", protect, router);

app.use("/user", createNewUser);
app.use("/signin", signin);
app.use(errorHandler);
// app.use((err, req, res, next) => {
//   if (err.type === "auth") {
//     res.status(401).json({message: "unauthorized"});
//   } else if (err.type === "input") {
//     res.status(400).json(err);
//   } else if (err.type === "regis") {
//     res.status(400).json({message: "username exist"});
//   } else {
//     res.status(500).json({message: "oop, theres something wrong"});
//   }
// });
export default app;
