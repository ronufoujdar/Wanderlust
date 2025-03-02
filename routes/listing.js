const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const { isLoggedIn,isOwner ,validateListing } = require("../middleware.js");

const listingController=require("../controllar/listing.js");
const multer=require('multer');
const {storage} =require("../cloudconfig.js")
const upload=multer({storage});


// index route
router.route("/")
.get(wrapAsync(listingController.index))
// //create route
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createlisting));


// New route
router.get("/new",isLoggedIn,listingController.newForm);


router.route("/:id")
//show route
.get(wrapAsync(listingController.showlisting))
// update route
.put(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing , wrapAsync(listingController.updatelisting))
//delete route
.delete(isOwner,isLoggedIn,wrapAsync(listingController.deletelisting));


//edit route 
router.get("/:id/edit",isOwner,isLoggedIn,wrapAsync(listingController.editlisting));
 

module.exports=router;
 
