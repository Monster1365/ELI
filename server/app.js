const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const db = require("./db");

dotenv.config();
const indexRouter = require("./api/routes");
const authRouter = require("./api/routes/auth");
const userRouter = require("./api/routes/user");
const postRouter = require("./api/routes/posts");
const chatRouter = require("./api/routes/chat");

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use("/posts", postRouter);
app.use("/chat", chatRouter);
app.use("/uploads", express.static("uploads"));



app.listen(app.get("port"), () => {
  console.log(`Server running on http://localhost:${ app.get("port") }`);
});