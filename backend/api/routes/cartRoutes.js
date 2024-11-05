const express = require("express");
const router = express.Router();
const {
  addToCarts,
  getCartByEmail,
  deleteCart,
  updateCart,
} = require("../controllers/cartController.js");
router.post("/", addToCarts);
router.get("/", getCartByEmail);
router.delete("/delete/:id", deleteCart);
router.put("/update/:id", updateCart);

module.exports = router;
