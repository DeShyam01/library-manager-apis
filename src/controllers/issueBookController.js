const express = require("express");
const User = require("../models/User");
const Book = require("../models/Book");
const IssueBook = require("../models/IssueBook");

const getAllIssueBooks = async (req, res) => {
  try {
    const issueBooks = await IssueBook.find();
    res.status(200).json(issueBooks);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const issueBook = async (req, res) => {
  try {
    if(req.user.role !== "Librarian"){
      return res.status(403).json({message: "Only Librarians can add books"});
    }

    const { bookId, studentId, issueDate, returnDate } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Strudent not found" });
    }

    if (book.quantity == 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    const bookName = book.name;
    const studentName = student.name;

    const newIssueBook = {
      bookId,
      bookName,
      studentId,
      studentName,
      issueDate,
      returnDate,
    };

    const issueBook = new IssueBook(newIssueBook);
    issueBook.save();

    book.quantity -= 1;
    await book.save();

    res
      .status(201)
      .json({ message: "Book issued successfully", data: issueBook });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const returnBook = async (req, res) => {
  try {
    if(req.user.role !== "Librarian"){
      return res.status(403).json({message: "Only Librarians can add books"});
    }
    
    const issueBook = await IssueBook.findById(req.params.id);

    if (!issueBook) {
      return res.status(404).json({ message: "Issued book record not found" });
    }

    if (issueBook.status === "Returned") {
      return res.status(400).json({ message: "Book is already returned" });
    }

    const book = await Book.findById(issueBook.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.quantity += 1;
    await book.save();

    issueBook.status = "Returned";

    await issueBook.save();

    res
      .status(200)
      .json({ message: "Book Returned successfully", data: issueBook });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { getAllIssueBooks, issueBook, returnBook };
