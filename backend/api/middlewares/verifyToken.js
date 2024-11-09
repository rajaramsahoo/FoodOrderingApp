const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    let decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decode);
    req.payload = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "unAuthorized person " });
  }
}

module.exports = verifyToken;
