const express = require('express');
const {getAllBooks, getBookById, createBook, updateBook, deleteBook}=require("../controllers/bookController");
const authMiddleWare = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", authMiddleWare, createBook);
router.put("/:id", authMiddleWare, updateBook);
router.delete("/:id", authMiddleWare, deleteBook);

module.exports = router;