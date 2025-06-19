  const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utlis/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../utlis/ExpressError.js");
const Review = require("../models/review.js");
const review = require("../models/review.js");
const Listing = require("../models/listing.js");
  const validatereview = (req,res,next)=>{
    let {error}=  reviewSchema.validate(req.body);
    
    if(error){
      let erMsg = error.details.map((el)=>el.message).join(",");
      console.log(erMsg);
      throw new ExpressError(400,erMsg);
    }else{
      next();
    }
  }
  //review
  //post route
router.post("/", validatereview, wrapAsync( async(req,res)=>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success","review created");
  res.redirect(`/listings/${listing._id}`);
}));

//delete review
router.delete
("/:reviewId", wrapAsync(async(req,res)=>{
  let { id , reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId }});
  await Review.findOneAndDelete("reviewId");
  req.flash("success","review deleted");
  res.redirect(`/listings/${id}`);
}));

module.exports = router;