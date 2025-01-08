const jwt = require("jsonwebtoken");
 function generateToken(payload) {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "105h",
  });

  return token;
}
module.exports = generateToken;