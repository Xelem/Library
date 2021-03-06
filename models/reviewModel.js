const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Please put in your review'],
    },
    rating: {
      type: Number,
      default: 4,
      min: [1, 'Cannot rate a book lower than 1'],
      max: [5, 'Cannot rate a book more than 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    book: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A review must belong to a book'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  }).populate({
    path: 'book',
    select: 'title author',
  });
  next();
});

reviewSchema.index({ book: 1, user: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
