const jwt = require("jsonwebtoken");
const config = require("config");

function generateAuthToken(user) {
  const token = jwt.sign(
    { _id: user._id, name: user.name, isAdmin: user.isAdmin },
    config.get("jwtKey"),
    { expiresIn: "4h" }
  );
  return token;
}

function verifyToken(tokenFromUSer) {
  try {
    const userData = jwt.verify(tokenFromUSer, config.get("jwtKey"));
    return userData;
  } catch (error) {
    return null;
  }
}

module.exports = { generateAuthToken, verifyToken };
