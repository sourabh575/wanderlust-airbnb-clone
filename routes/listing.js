const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../utlis/ExpressError.js");

  const validateListing = (req,res,next)=>{
    let {error}=  listingSchema.validate(req.body);
    
    if(error){
      let erMsg = error.details.map((el)=>el.message).join(",");
      console.log(erMsg);
      throw new ExpressError(400,erMsg);
    }else{
      next();
    }
  }

  //index route
  router.get("/",wrapAsync(async(req,res)=>{
  const allListings =  await Listing.find({});
  res.render("listings/index.ejs",{allListings});
}));

  //New route
 router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });

  //show route
  router.get("/:id",wrapAsync(async(req,res)=>{
    const {id} = req.params;
      const listing = await Listing.findById(id).populate("reviews");   
      if(!listing){
        req.flash("error","This listing does not exist!");
        res.redirect("/listings");
      }
      res.render("listings/show.ejs",{listing});
    }));

      //create route
     router.post(
        "/",
        validateListing,
        wrapAsync(async(req, res,next) => {
        // if(!req.body.listing){
        //   throw new ExpressError(400,"send valid data for listing");
        // }
          const newlisting = new Listing(req.body.listing);
          // if(!newlisting.description){
          //   throw new ExpressError(400,"Description is missing");
          // }
          // if(!newlisting.title){
          //   throw new ExpressError(400,"Title is missing");
          // }
          // if(!newlisting.location){
          //   throw new ExpressError(400,"locaton is missing");
          // } 
         
        await newlisting.save()
        req.flash("success","new list added");
       
        res.redirect("/listings");
        })
      );

    //edit route
      router.get("/:id/edit", wrapAsync(async (req, res) => {
        const{id} = req.params;
        const listing = await Listing.findById(id);
       if(!listing){
        req.flash("error","This listing does not exist!");
        res.redirect("/listings");
      }
        res.render("listings/edit.ejs",{listing});
      }));
      
    // Update route
      router.put("/:id",
        validateListing, 
        wrapAsync(async (req, res) => {
        let { id } = req.params;
        let updatedListing = req.body.listing;
        
        await Listing.findByIdAndUpdate(id, updatedListing, { new: true });
        req.flash("success","listing updated");
        res.redirect(`/listings/${id}`);
      }));
      
      
    //delete route
      router.delete("/:id", wrapAsync(async (req, res) => {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success","listing deleted");
        res.redirect("/listings");
      }));

      module.exports = router;