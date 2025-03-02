const Listing = require("./models/listing");
const Review = require("./models/review");

const ExpressError=require("./utils/ExpressError.js");
const {listingSchema ,reviewSchema}=require("./Schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    // !req.isAuthenticated use for authenticate the user is login or not
   if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error", "You must be logged in to create listing!");
    return res.redirect("/login");
 }
 next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirect=req.session.redirectUrl;
    }
    next();
};

//owner validation
module.exports.isOwner= async(req,res,next)=>{
 let {id}=req.params;
 let listing=await Listing.findById(id);
 if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","you don't have permission ")
    return res.redirect(`/listings/${id}`);
 }
 next();
};

// validate listing from schema.js using joi npm
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body)
    if(error){
       let errMsg=error.details.map((el)=>el.message).join(",")
       throw new ExpressError(400, errMsg);
    }else{
       next();
    }
};

//validate Review from schema.js uding joi npm 
module.exports. validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body)
    if(error){
       let errMsg=error.details.map((el)=>el.message).join(",")
       throw new ExpressError(400, errMsg);
    }else{
       next();
    }
};

// review owner validation
module.exports.isReviewAuthor= async(req,res,next)=>{
   let { id,reviewId}=req.params;
   let review=await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","You are not author of this review ")
      return res.redirect(`/listings/${id}`);
   }
   next();
  };

