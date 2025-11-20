const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../db");

const SECRET_KEY = process.env.SECRET_KEY;
//해쉬
//bcrypt.hashSync(row.password, 8)

function generateToken(user) {
  return jwt.sign(
    { id: user.id },
    SECRET_KEY,
    { expiresIn: "10m" }
  );
}

router.post("/login", (req, res) => {
  console.log(req.body);
  const { id, password } = req.body;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ message: "DB 오류" });
    if (!row) return res.status(400).json({ message: "아이디 틀림" });
    const valid = bcrypt.compareSync(password, row.password);
    if (!valid) return res.status(400).json({ message: "비밀번호 틀림" });

    const token = generateToken(row);
    res.json({ token });
  });
});

module.exports = router;