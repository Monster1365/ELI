const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = function (req, res, next) {
  const cookies = req.cookies;
  const token = cookies.access_cookie;
  if (!token)
    return res.status(401).json({ message: "Token does not exist" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Token not valid" });

    req.user = decoded;
    next();
  });
};