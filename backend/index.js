const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("./config/dbConnect.js");
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
// middleware
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000', '*'],
  credentials: true,
  methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors());

const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes.js")
const usersRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes.js");


app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", usersRoutes);
app.use("/payments", paymentRoutes);

console.log(process.env.STRIPE_SECRET_KEY)
//stripe payment routes

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price*100,
    currency: "inr",
    // automatic_payment_methods: {
    //   enabled: true, 
    // },  
    payment_method_types: ["card"],

  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
