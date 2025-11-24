const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../db");

const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(user) {
  return jwt.sign(
    { id: user.id },
    SECRET_KEY,
    { expiresIn: "20m" }
  );
}

router.post("/login", (req, res) => {
  const { id, password } = req.body;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ message: "DB 오류" });
    if (!row) return res.status(400).json({ message: "아이디 틀림" });
    const valid = bcrypt.compareSync(password, row.password);
    if (!valid) return res.status(400).json({ message: "비밀번호 틀림" });

    const token = generateToken(row);

    res.cookie("access_cookie", token, {
      httpOnly: true,
      secure: false, //임시
      sameSite: "lax", //임시
      maxAge: 1000 * 60 * 60
    });
    res.json({ success: true });
  });
});

router.post("/sign", (req, res) => {
  if (!req.body) return res.status(400).json({ message: "bad req" });
  const { email, id, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  
  db.all("SELECT id, username FROM users", (err, users) => {
    if (err) return res.status(500).json({ message: "DB 오류" });

    for (const user of users) {
      if (user.id === id) {
        return res.status(400).json({ message: "Duplicate id" });
      }
      if (user.username === username) {
        return res.status(400).json({ message: "Duplicate username" });
      }
    }

    db.run(`INSERT INTO users(id, password, username, email) VALUES (?, ?, ?, ?)`, [id, hashedPassword, username, email], (err2) => {
      if (err2) return res.status(500).json({ message: "db 오류" });
      return res.status(200).json({ message: "success" });
    });
  });
});

module.exports = router;