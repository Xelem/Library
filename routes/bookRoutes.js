const express = require("express");
const bookController = require("../controllers/bookController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    bookController.registerBook
  );

router
  .route("/:id")
  .get(bookController.getOneBook)
  .put(
    authController.protect,
    authController.restrictTo("admin"),
    bookController.updateBook
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    bookController.deleteBook
  );

router.use("/:bookId/reviews", reviewRouter);

module.exports = router;
