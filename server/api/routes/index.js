const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  console.log('success');
  res.send('test index');
});

module.exports = router;