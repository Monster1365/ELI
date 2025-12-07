const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const db = require("../../db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Certifyed user",
    user: req.user,
    inputStatus: "success"
  });
});

router.get("/data", auth, (req, res) => {
  db.get("SELECT id, username, email, image, intro FROM users WHERE id = ?", [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ message: "get /user/data: DB 오류" });
    res.json(user);
  });
});

router.put("/update", auth, upload.single("image"), (req, res) => {
  const { username, email, intro } = req.body;

  let imagelUrl = null;
  if (req.file) {
    imagelUrl = `/uploads/${req.file.filename}`;
    db.run(
      `UPDATE users SET username = ?, email = ?, image = ?, intro = ? WHERE id = ?`,
      [username, email, imagelUrl, intro, req.user.id],
      function (err) {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "success" });
      }
    );
  } else {
      db.run(
      `UPDATE users SET username = ?, email = ?, intro = ? WHERE id = ?`,
      [username, email, intro, req.user.id],
      function (err) {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "success" });
      }
    );
  }
});

router.get("/:id", (req, res) => {
  db.get("SELECT username, email, image, intro FROM users WHERE id = ?", [req.params.id], (err, user) => {
    if (err) return res.status(500).json({ message: "get /user/id: DB 오류" });
    res.json(user);
  });
});

module.exports = router;