const express = require("express");
const { createPayment,singleUserPaymentHistory ,confirmBooking,getAllBookinHistory} = require("../controllers/paymentController.js")
const router = express.Router();

router.post("/", createPayment);
router.get("/", singleUserPaymentHistory);
router.get("/all", getAllBookinHistory);
router.put("/:id", confirmBooking);

module.exports = router;
