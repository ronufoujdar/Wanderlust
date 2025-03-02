const { string, required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
//use for store in  db and automatic store user and pass
const passportlocalmongoose=require("passport-local-mongoose");


const userSchema=new Schema({
    email:{
        type:String,
        required:true
    }
});

userSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model('User',userSchema);