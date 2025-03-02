const Listing=require("../models/listing");


// index
module.exports.index=(async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{ allListings })
});


// new 
module.exports.newForm=(req,res)=>{
    res.render("listings/new.ejs")
 };


//show
module.exports.showlisting=(async(req,res)=>{
    let {id}=req.params;
   const listing= await Listing.findById(id)
   .populate({path:"reviews",populate:{ path:"author",
   },
 })
   .populate("owner");
   if(!listing){
     req.flash("error","Listing you requested for does not exist ! ");
     res.redirect("/listings");
   }
   res.render("listings/show.ejs",{listing});
});

// crete
module.exports.createlisting=(async(req,res,next)=>{
    // let {title,description,image,price,country,location}=req.body;
    let url=req.file.path;
    let filename=req.file.filename; 
   const newListing = new Listing (req.body.listing);
   newListing.owner=req.user._id;
   newListing.image={url,filename};
   await newListing.save();
    req.flash("success","New listing are created !")
    res.redirect("/listings");
});


//edit form
module.exports.editlisting=(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    if(!listing){
     req.flash("error","Listing you requested for does not exist ! ");
     res.redirect("/listings");
   }
    res.render("listings/edit.ejs",{ listing });
});

//update form
module.exports.updatelisting=(async(req,res)=>{
    let {id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing});
   if(typeof req.file !=="undefined"){
   let url=req.file.path;
   let filename=req.file.filename;
   listing.image={url,filename};
   await listing.save();
   }
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`);
});

//delete
module.exports.deletelisting=( async (req,res)=>{
     let {id}=req.params;
     let deletedListing=await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     req.flash("success","listing Deleted !")
     res.redirect("/listings")
    });
 