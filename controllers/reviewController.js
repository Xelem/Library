const Review = require("../models/reviewModel");
const factory = require("./handlerFactory");

exports.createReview = factory.createNew(Review);
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);

exports.setBookUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.book) req.body.book = req.params.bookId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
