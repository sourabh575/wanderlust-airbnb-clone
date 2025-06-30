const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utlis/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../utlis/ExpressError.js");
const Review = require("../models/review.js");
const review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validatereview, isLoggedIn, isreviewauthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// Post review
router.post("/",
    isLoggedIn,
    validatereview,
    wrapAsync(reviewController.createReview)
);

// Delete review
router.delete(
    "/:reviewId",
    isLoggedIn,
    isreviewauthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;