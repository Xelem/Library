const mongoose = require("mongoose");

const purchasedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A review must belong to a user"],
  },
  book: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A review must belong to a book"],
  },
  price: {
    type: Number,
    required: [true, "Every purchase must have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

const Purchased = mongoose.model("Purshased", purchasedSchema);
module.exports = Purchased;
