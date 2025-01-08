const Payment = require("../models/Payments.js")
const Cart = require('../models/Carts.js');
const mongoose = require('mongoose');
// Import your Cart model
const ObjectId = mongoose.Types.ObjectId;
const createPayment = async (req, res) => {
    const payment = req.body;

    try {
        // Create a new payment using Mongoose model
        const paymentResult = await Payment.create(payment);

        // Delete items from the cart
        const cartIds = payment.cartItems.map(id => new ObjectId(id));

        const deleteResult = await Cart.deleteMany({ _id: { $in: cartIds } });

        res.status(200).json({ paymentResult, deleteResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const singleUserPaymentHistory = async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    try {
       const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
       res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBookinHistory = async (req, res) => {
    try {
      const menus = await Payment.find({}).sort({ createdAt: -1 });
      res.status(200).json(menus);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

const confirmBooking = async (req, res) => {
    const payId = req.params.id;
    const { status } = req.body;
    try {
        const updatedStatus = await Payment.findByIdAndUpdate(
            payId,
            {status: 'confirmed'},
            { new: true, runValidators: true }
        );

        // console.log(updatedUser)

        if (!updatedStatus) {
            return res.status(404).json({ message: 'Pay Id not found' });
        }

        res.status(200).json(updatedStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createPayment ,singleUserPaymentHistory,getAllBookinHistory,confirmBooking};
