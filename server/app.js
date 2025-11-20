const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();
const indexRouter = require("./api/routes");
const authRouter = require("./api/routes/auth");
const userRouter = require("./api/routes/user");

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);


app.listen(app.get("port"), () => {
  console.log(`Server running on http://localhost:${ app.get("port") }`);
});