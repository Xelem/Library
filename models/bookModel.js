const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A book must have a title'],
      unique: true,
      maxlength: [
        20,
        'The title of a book must not be more than 40 characters',
      ],
      minlength: [3, 'The title of a book must not be less than 3 characters'],
    },
    author: {
      type: String,
      required: [true, 'A book must have an author'],
      maxlength: [
        20,
        'The name of the author of a book must not be more than 20 characters',
      ],
      minlength: [
        3,
        'The name of the author of a book must not be less than 3 characters',
      ],
    },
    category: {
      type: String,
      enum: ['Drama', 'Prose', 'Poetry'],
    },
    price: {
      type: Number,
      required: [true, 'A book must have a price'],
    },
    imageCover: {
      type: String,
      required: [true, 'A book must have an image cover'],
    },
    registeredAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
