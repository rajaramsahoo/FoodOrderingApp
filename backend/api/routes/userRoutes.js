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

router.post("/", createUser);
router.get("/", verifyToken, getAllUsers);
// router.get("/",getAllUsers);

router.get("/admin/:email", getAdmin);
router.put("/admin/:id", makeAdmin);
router.delete("/:id", deleteUser);
router.post("/signin", loginUser);

module.exports = router;
