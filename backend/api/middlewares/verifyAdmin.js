// middlewares
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    console.log(req.payload.user.email)
    const email = req.payload.user.email;
    const query = { email: email };
    const user = await User.findOne(query);
    const isAdmin = user?.role === "admin";
    if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
    }
    next();
};

module.exports = verifyAdmin;