const Book = require("../models/bookModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.registerBook = factory.createNew(Book);
exports.getAllBooks = factory.getAll(Book);
exports.getOneBook = factory.getOne(Book);
exports.deleteBook = factory.deleteOne(Book);

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findOneAndReplace(req.params.id);
  if (!book) return new AppError("There is no book with that ID", 400);

  res.status(200).json({
    status: "success",
    data: book,
  });
});
