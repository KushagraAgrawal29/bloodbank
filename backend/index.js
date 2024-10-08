const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();
const port = 3177;

dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use(
    cors({
        //making backend to entertain frontend requests
        origin:["https://bloodbank-client.vercel.app"],
		methods: ["GET", "POST", "PUT", "DELETE"],
        credentials:true,
    })
)


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (e) => {
	console.log(e ? e : "Connected successfully to database");
});

app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

app.get("/",(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Your server is up and running...",
    });
});

app.listen(port, () =>
	console.log(`Server running at http://localhost:${port}`)
);