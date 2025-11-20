const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

// 인증 필요한 API
router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Certifyed user",
    user: req.user,
    inputStatus: "success"
  });
});

module.exports = router;