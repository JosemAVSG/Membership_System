const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authrequired = () => {
  return (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.userId = decoded.id;
      next();
    });
  };
};

module.exports = authrequired;