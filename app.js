if(process.env.NODE_ENV !="production"){
require("dotenv").config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash")// using flash to confirm cookies arr correct
const passport=require("passport");//authentication 
const LocalStrategy=require("passport-local");
const User=require("./models/user.js")


const listingRouter=require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter=require("./routes/user.js")


main()
.then(()=>{
   console.log("Connected to db");
})
.catch((err)=>{
    console.log(err);
    
});

// const MONGO_URL="mongodb://127.0.0.1:27017/WanderLust"
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Wander Travel")
}

app.set("views engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


// using session for cookies
const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    Cookie:
    {
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());//page to page
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//store info about user
passport.deserializeUser(User.deserializeUser());//unstore info about user


// for flash
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter)


//Errorhandling route
app.all("*",(req,res,next)=>{
   next(new ExpressError(404,"Page Not Found !"))
})

app.use((err,req,res,next)=>{
   let { statusCode=500,message="Something went wrong !"}=err;
   res.status(statusCode).render("error.ejs",{ message})
   // res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
    
})