const express=require("express");
const router=express.Router({mergeParams:true});//merge review and id
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllar/review.js")


//Reviews
//Post review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createreview));

// Delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deletereview));

module.exports=router;