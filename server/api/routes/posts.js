const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../../db");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/new", upload.single("thumbnail"), (req, res) => {
  const { author_id, title, content, price, tag } = req.body;

  // 업로드된 파일 URL
  let thumbnailUrl = null;
  if (req.file) {
    thumbnailUrl = `../../../uploads/${req.file.filename}`;
  }

  db.run(
    `INSERT INTO posts (author_id, title, content, thumbnail, price, tags, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [author_id, title, content, thumbnailUrl, price, tag, Date.now()],
    function (err) {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "success", id: this.lastID });
    }
  );
});

module.exports = router;
