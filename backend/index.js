const express = require("express");
const cors = require("cors");

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

//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/bank",bankRoutes);
app.use("/api/v1/camp",campRoutes);
app.use("/api/v1/user",userRoutes);

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


