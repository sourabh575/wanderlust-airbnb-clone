const Listing = require("./models/listing");
const review = require("./models/review.js");
const Review = require("./models/review.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utlis/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in first");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async(req,res,next) =>{
  let { id } = req.params;
        let listing = await Listing.findById(id);
        if( !listing.owner.equals(res.locals.currUser._id)){
          req.flash("error","you are not owner of this listing");
          return res.redirect(`/listings/${id}`);  
        }
      next();
}

module.exports.validateListing = (req,res,next)=>{
    let {error}=  listingSchema.validate(req.body);
    
    if(error){
      let erMsg = error.details.map((el)=>el.message).join(",");
      console.log(erMsg);
      throw new ExpressError(400,erMsg);
    }else{
      next();
    }
  }

  module.exports.validatereview = (req,res,next)=>{
    let {error}=  reviewSchema.validate(req.body);
    
    if(error){
      let erMsg = error.details.map((el)=>el.message).join(",");
      console.log(erMsg);
      throw new ExpressError(400,erMsg);
    }else{
      next();
    }
  }

module.exports.isreviewauthor = async (req, res, next) => {
    try {
        let { id, reviewId } = req.params;
        let review = await Review.findById(reviewId);
        
        if (!review) {
            req.flash("error", "Review not found");
            return res.redirect(`/listings/${id}`);
        }

        if (!review.author.equals(res.locals.currUser._id)) {
            req.flash("error", "You don't have permission to do that");
            return res.redirect(`/listings/${id}`);
        }
        
        // Store the review for later use
        res.locals.review = review;
        next();
    } catch (err) {
        next(err);
    }
};

