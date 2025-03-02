const Listing=require("../models/listing");
const Review=require("../models/review");

// createReview
module.exports.createreview=(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review created !")
  res.redirect(`/listings/${listing._id}`)
    
});

// deletereview
module.exports.deletereview=(async(req ,res)=>{
 let {id , reviewId} =req.params;
 await Listing.findByIdAndUpdate(id,{ $pull: {reviews:reviewId}});//pull-remove array
 await Review.findByIdAndDelete(reviewId);
 req.flash("success","Review Deleted !")
 res.redirect(`/listings/${id}`);
});