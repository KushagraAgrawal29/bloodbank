const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const app = express();
const database = require("./config/database");

const userRoutes = require("./routes/userRouter");
const bankRoutes = require("./routes/bankRouter");
const campRoutes = require("./routes/campRouter");
const authRoutes = require("./routes/authRouter");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

//database connection
database.connect();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: [
			"http://localhost:3000",
		],
		credentials: true,
	})
);


