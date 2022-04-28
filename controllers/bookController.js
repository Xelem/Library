const Book = require("../models/bookModel");

exports.registerBook = async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(201).json({
    status: "success",
    data: book,
  });
};

exports.getAllBooks = async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    status: "success",
    data: books,
  });
};
