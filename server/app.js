const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
app.set('port', 3001)
app.use(cors());
app.use(express.json());

//const db = new sqlite3.Database("./database.db");

app.listen(app.get("port"), () => {
  console.log(`Server running on http://localhost:${ app.get("port") }`);
});