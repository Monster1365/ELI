const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const db = require("../../db");

// 인증 필요한 API
router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Certifyed user",
    user: req.user,
    inputStatus: "success"
  });
});

router.get("/data", auth, (req, res) => {
  db.get("SELECT id, username, email FROM users WHERE id = ?", [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ message: "get /user/data: DB 오류" });
    res.json(user);
  });
});

module.exports = router;