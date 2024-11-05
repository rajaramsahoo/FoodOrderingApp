const Menu = require("../models/Menu.js");
// post a menu item
 const postMenuItem = async (req, res) => {
  const newMenu = req.body;
  try {
    const result = await Menu.create(newMenu);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postMenuItem,
  getAllMenuItems
};
