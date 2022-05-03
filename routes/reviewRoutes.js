const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

// RESTRICT only to logged in users
router.use(authController.protect);

router
  .route("/")
  .get(authController.restrictTo("admin"), reviewController.getAllReviews)
  .post(
    authController.restrictTo("user"),
    reviewController.setBookUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .get(reviewController.getReview)
  .put(authController.restrictTo("user"), reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
