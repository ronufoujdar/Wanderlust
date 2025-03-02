const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js"); // Corrected path

main()
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust");
}

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj,owner:"67b9c11610012b6a3b2f7817"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDb();