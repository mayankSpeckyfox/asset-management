import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./db.js";
import rolesRouter from "./routes/Rolesroute.js";
import userRouter from "./routes/Userroutes.js";
import permissionRouter from "./routes/Permissionroutes.js";
const app = express();
app.use(express.json());
dotenv.config();
app.use(cookieParser());
app.use(cors());
//routes

//router for role
app.use("/api/roles", rolesRouter);
//router for user
app.use("/api/users", userRouter);
//router for permissions
app.use("/api/permissions", permissionRouter);

//port
const Port = process.env.PORT;

//server
app.listen(Port, () => {
  connect();
  console.log(`Server is running on port : ${Port} `);
});
