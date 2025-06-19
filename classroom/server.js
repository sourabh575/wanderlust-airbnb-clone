const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser("secretcode"));
const flash = require("connect-flash");

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(flash());

const sessionOptions = {
    secret: 'keyboard cat',
     resave: false,
    saveUninitialized: true,
//   cookie: { secure: true }
};

app.use(session(sessionOptions));
 
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","india",{signed:true});
//     res.send("cookie send");
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("rcb","ipl");
//     res.send("this is cookie route");
// })

// app.get("/greet",(req,res)=>{
//     let{name = "anonymous"} = req.cookies;
//     res.send(`hi ${name}`);
// })

// app.get("/",(req,res)=>{
//    console.dir(req.cookies);
//     res.send("This is root Page");
// })

app.use((req,res,next)=>{
   res.locals.message = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/test",(req,res)=>{
    res.send("test successfully")
});

//this track the single session how much time single session called 
app.get("/reqcount",(req,res)=>{
    if(req.session.count ){
        req.session.count ++;
    }
    else{
        req.session.count =1;
    }
    res.send(`you send a request ${req.session.count} times`)
});

app.get("/register",(req,res)=>{
    let {name = "anynomous"} = req.query;
    req.session.name = name; 
   if(name == "anynomous"){
     req.flash("error","name is not valid");
   }
   else{
     req.flash("success","user registered successfully");
   }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name});
});

app.listen(3000,()=>{
    console.log(`server is running on ${3000}`);
})