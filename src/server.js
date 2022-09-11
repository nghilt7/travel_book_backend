require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import connection from "./config/connectDB";
import configCors from "./config/configCors";

const app = express();
const PORT = process.env.PORT || 7070;

// config view and static folder
configViewEngine(app);

// config cors
configCors(app);

// check connection database
connection();

// config cookie parser
app.use(cookieParser());

// config body parser to get req from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// config web routes
initApiRoutes(app);

// run server at port
app.listen(PORT, () =>
  console.log(
    `>>> ✅ JWT Backend Server is running at PORT: http://localhost:${PORT}`
  )
);
