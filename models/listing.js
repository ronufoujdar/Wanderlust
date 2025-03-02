const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js")

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    // image: {
    //     filename: {
    //       type: String,
    //       default: "listingimage.jpg", // Default filename if not provided
    //     },
    //     url: {
    //       type: String,
    //       default: "https://in.images.search.yahoo.com/search/images?p=cs+images&fr=mcafee&type=E210IN885G0&imgurl=https%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2016%2F08%2FCounter-Strike-Global-Offensive-HD-Background.jpg#id=11&iurl=https%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2016%2F08%2FCounter-Strike-Global-Offensive-HD-Background.jpg&action=click",
    //       set: (v) => v === "" 
    //         ? "https://in.images.search.yahoo.com/search/images?p=cs+images&fr=mcafee&type=E210IN885G0&imgurl=https%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2016%2F08%2FCounter-Strike-Global-Offensive-HD-Background.jpg#id=11&iurl=https%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2016%2F08%2FCounter-Strike-Global-Offensive-HD-Background.jpg&action=click" 
    //         : v, // If URL is an empty string, set the default URL
    //     },
    //   },

    price:Number,
    location:String,
    country:String,
    reviews:[
        {
        type: Schema.Types.ObjectId,
        ref :"Review"
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{ $in: listing.reviews }});
    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;