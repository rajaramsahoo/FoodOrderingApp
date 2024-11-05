const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getAdmin,
  makeAdmin,
  deleteUser,
  singleUser
} = require("../controllers/userControllers.js");
const verifyToken = require('../middlewares/verifyToken');

router.post("/", createUser);
router.get("/", verifyToken,getAllUsers);
router.get("/admin/:email", getAdmin);
router.put("/admin/:id", makeAdmin);
router.delete("/:id", deleteUser);
router.get("/:email", singleUser);

module.exports = router;
