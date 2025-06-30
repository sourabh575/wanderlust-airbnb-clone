const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../utlis/ExpressError.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")
 const listingcontroller = require("../controllers/listing.js");

  //index route
  router.get("/",wrapAsync(listingcontroller.index));

  //New route
 router.get("/new", isLoggedIn,listingcontroller.rendernewform);

  //show route
  router.get("/:id",wrapAsync(listingcontroller.show));

      //create route
     router.post("/",isLoggedIn,validateListing,
        wrapAsync(listingcontroller.createlisting)
     );

    //edit route
      router.get("/:id/edit",
        isLoggedIn,
         //isOwner,
         wrapAsync(listingcontroller.edit));
      
    // Update route
      router.put("/:id", 
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingcontroller.updatelisting));
      
      
    //delete route
      router.delete("/:id",
        isLoggedIn,
          isOwner,
         wrapAsync(listingcontroller.deletelisting));

      module.exports = router;