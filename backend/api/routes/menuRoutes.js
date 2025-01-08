const express = require('express');
const router = express.Router();
const { postMenuItem } = require("../controllers/menuController.js")
const { getAllMenuItems, deleteMenu, singleMenuItem, updateMenuItem } = require("../controllers/menuController.js")
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// post a menu item
router.post('/', verifyToken, verifyAdmin, postMenuItem);
router.get('/', getAllMenuItems);
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteMenu);
router.get('/:id', singleMenuItem);
router.put('/:id', updateMenuItem);

module.exports = router;