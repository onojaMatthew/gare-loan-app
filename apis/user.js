const express = require("express");
const { 
  createUser, 
  getUsers, 
  getUser,
  deleteUser,
} = require("../controller/user");
const { validateUser } = require("../validation/user_validator");


const router = express.Router();

router.post("/create", validateUser, createUser);
router.get("/users", getUsers);
router.put("/user", getUser);
router.put("/delete", deleteUser);

module.exports = router;