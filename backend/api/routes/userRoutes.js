const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getAdmin,
  makeAdmin,
  deleteUser,
  loginUser,
} = require("../controllers/userControllers.js");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require('../middlewares/verifyAdmin.js')
router.post("/", createUser);
router.get("/", verifyToken,verifyAdmin, getAllUsers);
// router.get("/",getAllUsers);

router.get("/admin/:email", getAdmin);
router.put("/admin/:id",verifyToken, makeAdmin);
router.delete("/:id",verifyToken, deleteUser);
router.post("/signin", loginUser);

module.exports = router;
