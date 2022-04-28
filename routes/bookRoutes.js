const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.registerBook);

router
  .route("/:id")
  .get(bookController.getOneBook)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
