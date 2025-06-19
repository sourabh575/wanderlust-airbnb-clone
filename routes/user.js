  const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStartegy = require('passport-local');



router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",async(req,res)=>{
   try{
     let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registreduser = await User.register(newUser,password);
    console.log(registreduser);
    req.flash("success","you have register successfully");
    res.redirect("/listings");
   }
   catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
   }
});

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",
    passport.authenticate("local",{failureRedirect:'/login'}),
     async(req,res)=>
    {
        req.flash("success","you are logged in");
        res.redirect("/listings");

})

      

module.exports = router;

