import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./db.js";
import rolesRouter from "./routes/Rolesroute.js";
import userRouter from "./routes/Userroutes.js";
import permissionRouter from "./routes/Permissionroutes.js";
import ticketRouter from "./routes/Ticketroutes.js";
import departmentRouter from "./routes/Departmentroutes.js";
import Authrouter from "./routes/Authroutes.js";
import fileupload from "express-fileupload";
const app = express();
app.use(express.json());
app.use(
  fileupload({
    createParentPath: true,
  })
);
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
//router for tickets
app.use("/api/tickets", ticketRouter);
//router for department
app.use("/api/department", departmentRouter);
//router for authentication
app.use("/api/authentication", Authrouter);

//port
const Port = process.env.PORT;

//server
app.listen(Port, () => {
  connect();
  console.log(`Server is running on port : ${Port} `);
});
