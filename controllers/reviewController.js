const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createReview = factory.createNew(Review);
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review)
    return next(new AppError('There is no review with that ID', 404));

  if (req.user.id !== review.user.toString())
    return next(
      new AppError('You cannot delete a review you did not create', 404)
    );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (!review)
    return next(new AppError('There is no document with that ID', 400));

  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.book) req.body.book = review.book;
  if (req.body.user !== review.user.toString())
    return next(
      new AppError('You cannot edit this review because you did not create it')
    );

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: updatedReview,
  });
});

exports.setBookUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.book) req.body.book = req.params.bookId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
