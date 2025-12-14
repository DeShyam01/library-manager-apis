const express = require("express");
const { getAllUsers, register, login, profile } = require("../controllers/userController");
const authMiddleWare = require("../middleware/authMiddleware")
const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleWare, profile);
module.exports = router;
