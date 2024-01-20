const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
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

app.use("/auth",require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

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


