const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const indexRouter = require("./api/routes");
const authRouter = require("./api/routes/auth");

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());

//const db = new sqlite3.Database("./database.db");

app.use('/', indexRouter);
app.use('/auth', authRouter);


app.listen(app.get("port"), () => {
  console.log(`Server running on http://localhost:${ app.get("port") }`);
});