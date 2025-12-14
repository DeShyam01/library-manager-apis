const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const {
  issueBook,
  returnBook,
  getAllIssueBooks,
} = require("../controllers/issueBookController");

const router = express.Router();

router.get("/", getAllIssueBooks);
router.post("/", authMiddleWare, issueBook);
router.put("/:id", authMiddleWare, returnBook);

module.exports = router;
