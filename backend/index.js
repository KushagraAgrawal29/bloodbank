const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const app = express();
const database = require("./config/database");

const userRoutes = require("./routers/userRouter");
const bankRoutes = require("./routers/bankRouter");
const campRoutes = require("./routers/campRouter");
const authRoutes = require("./routers/authRouter");

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

//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/auth",bankRoutes);
app.use("/api/v1/auth",campRoutes);
app.use("/api/v1/auth",userRoutes);

//default route
app.get("/",(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Your server is up and running...",
    });
});

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})


