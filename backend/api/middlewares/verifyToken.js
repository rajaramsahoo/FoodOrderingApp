const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    // Check if the Authorization header exists
   
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing in Authorization header" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.payload = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized access" });
  }
}

module.exports = verifyToken;
