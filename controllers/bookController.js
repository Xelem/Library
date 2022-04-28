const Book = require("../models/bookModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.registerBook = catchAsync(async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(201).json({
    status: "success",
    data: book,
  });
});

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    status: "success",
    data: books,
  });
});

exports.getOneBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) return new AppError("There is no book with that ID", 400);

  res.status(200).json({
    status: "success",
    data: book,
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findOneAndReplace(req.params.id);
  if (!book) return new AppError("There is no book with that ID", 400);

  res.status(200).json({
    status: "success",
    data: book,
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return new AppError("There is no book with that ID", 400);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
