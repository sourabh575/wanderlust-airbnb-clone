const { model } = require("mongoose");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        const newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        
        req.flash("success", "Review added successfully!");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        req.flash("error", "Error creating review");
        res.redirect(`/listings/${req.params.id}`);
    }
};

module.exports.destroyReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        
        // Remove review reference from listing
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId }});
        
        // Delete the review
        await Review.findByIdAndDelete(reviewId);
        
        req.flash("success", "Review deleted successfully!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        req.flash("error", "Error deleting review");
        res.redirect(`/listings/${req.params.id}`);
    }
}; 
