const express = require('express');
const router = express.Router();
const {postMenuItem} = require("../controllers/menuController.js")
const {getAllMenuItems} = require("../controllers/menuController.js")

// post a menu item
router.post('/', postMenuItem);
router.get('/', getAllMenuItems);

module.exports = router;