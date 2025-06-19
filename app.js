const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const cors = require('cors');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utlis/ExpressError.js");

//routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userrouter = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require('passport');
const LocalStartegy = require('passport-local');
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method")); 
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


main().
then(()=>{console.log("connection successfully");
})
.catch(err => console.log(err));
 
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const sessionOptions = {
  secret :"my2123",
  resave:false,
  saveUnitialized:true,
  cookie:{
    expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  }
}

app.get("/", (req, res) => {
    res.send("root is working");
  });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(User.authenticate()));

passport.serializeUser(User.serializeUser());//it store user related informatin
passport.deserializeUser(User.deserializeUser());//it remove user related informatin

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    //console.log(success);
  next();
});

app.get("/demo", async(req,res)=>{
  const fakeuser = new User({
    email:"sourabh@gmailcom",
    username:"sourabh",
  });
  
 const registeruser =  await User.register(fakeuser,"hello");
  res.send(registeruser);
})

  app.use("/listings",listings);
  app.use("/listings/:id/reviews",reviews);
  app.use("/",userrouter);

// app.get("/testlistings", async (req, res) => {
  //       let sampleListings = new Listing({
    //         title: "My New Villa",
    //         description: "By the beach",
    //         price: 1200,
    //         location: "calangute,Goa",
    //         country: "India",
    //       });
    
    //       await sampleListings.save();
    //       console.log("sample was saved");
    //       res.send("succesfully saved");  
    // });

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page Not found"));
})

    app.use((err,req,res,next)=>{
      let{statusCode=500,message ="Something went wrong"} = err;
    //   res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});  
    })

    app.listen(8080, () => {
      console.log("server is listening on port 8080");
    });
    