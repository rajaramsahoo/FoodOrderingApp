const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("./config/dbConnect.js");
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes  = require("./api/routes/cartRoutes.js")
const usersRoutes = require("./api/routes/userRoutes");
app.post("/jwt", async (req, res) => {
  const user = req.body;
  // console.log(user)
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
