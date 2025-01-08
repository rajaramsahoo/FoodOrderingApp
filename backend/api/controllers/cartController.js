const Carts = require("../models/Carts.js");
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Carts.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCarts = async (req, res) => {
  const { name, recipe, image, price, email, quantity, menuItemId } = req.body;

  try {
    // Check if menuItemId already exists in the database
    const existingCartItem = await Carts.findOne({ email, menuItemId });
    // console.log(existingCartItem)

    if (existingCartItem) {
      // If menuItemId exists, send a message and do not create a new cart item
      return res
        .status(403)
        .json({ message: "Product already exists in the cart." });
    }

    // If menuItemId doesn't exist, create a new cart item
    const cartItem = await Carts.create({
      name,
      recipe,
      image,
      price,
      email,
      quantity,
      menuItemId,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a cart
const deleteCart = async (req, res) => {
  //console.log(raja)
  console.log(req.params);
  const { id } = req.params;
  try {
    const deletedCart = await Carts.findByIdAndDelete(id);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart Items not found" });
    }

    res.status(200).json({ message: "Cart Items Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateCart = async (req, res) => {
  const { id } = req.params;
  const { name, recipe, image, price, email, quantity, menuItemId } = req.body;
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      id,
      { name, recipe, image, price, email, quantity, menuItemId },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart Item not found" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getCartByEmail,
  addToCarts,
  deleteCart,
  updateCart,
  // getSingleCart,
};
