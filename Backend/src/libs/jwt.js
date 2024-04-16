const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: "24h" });
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateToken;
