const express = require("express");
const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Books not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createBook = (req, res) => {
  try {
    if(req.user.role !== "Librarian"){
      return res.status(403).json({message: "Only Librarians can add books"});
    }

    const { name, author, publishedYear, price, quantity, availability } = req.body;
    if (
      !name ||
      !author ||
      !publishedYear ||
      !price ||
      !quantity ||
      !availability
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    newBook = {
      name,
      author,
      publishedYear,
      price,
      quantity,
      availability,
    };

    const book = new Book(newBook);
    book.save();
    res.status(201).json({ message: "Book created successfully", data: newBook });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateBook = async (req, res) => {
  try {
    if(req.user.role !== "Librarian"){
      return res.status(403).json({message: "Only Librarians can add books"});
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", data: book });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteBook = async (req, res) => {
  try {
    if(req.user.role !== "Librarian"){
      return res.status(403).json({message: "Only Librarians can add books"});
    }
    
    const book = await Book.findByIdAndDelete(req.params.id)

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
