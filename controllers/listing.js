
const Listing = require("../models/listing");

module.exports.index = async(req,res)=>{
  const allListings =  await Listing.find({}); 
  res.render("listings/index.ejs",{allListings});
  };

  module.exports.rendernewform = (req, res) => {
    res.render("listings/new.ejs");
  };

  module.exports.show = async(req,res)=>{
      const {id} = req.params;
        const listing = await Listing.findById(id)
        .populate({
          path:"reviews",
          populate:{
            path:"author",
          }
        })
        .populate("owner");   
        if(!listing){
          req.flash("error","This listing does not exist!");
          res.redirect("/listings");
        }
        res.render("listings/show.ejs",{listing});
      };

      module.exports.createlisting = async(req, res,next) => {
        // if(!req.body.listing){
        //   throw new ExpressError(400,"send valid data for listing");
        // }
          // if(!newlisting.description){
          //   throw new ExpressError(400,"Description is missing");
          // }
          // if(!newlisting.title){
          //   throw new ExpressError(400,"Title is missing");
          // }
          // if(!newlisting.location){
          //   throw new ExpressError(400,"locaton is missing");
          // } 
         const newlisting = new Listing(req.body.listing);
         newlisting.owner = req.user.id;
        await newlisting.save()
        req.flash("success","new list added");
        res.redirect("/listings");
        };

        module.exports.edit = async (req, res) => {
                const{id} = req.params;
                const listing = await Listing.findById(id);
               if(!listing){
                req.flash("error","This listing does not exist!");
                res.redirect("/listings");
              }
                res.render("listings/edit.ejs",{listing});
        };
        module.exports.updatelisting = async (req, res) => {
                let { id } = req.params;
                await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
                req.flash("success","listing updated");
                res.redirect(`/listings/${id}`);
            };

        module.exports.deletelisting = async (req, res) => {
                const { id } = req.params;
                await Listing.findByIdAndDelete(id);
                req.flash("success","listing deleted");
                res.redirect("/listings");
              };