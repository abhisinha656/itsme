const mongoose= require("mongoose");
const validator = require("validator");

const message = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email Id..');
            }
        }
    },
    subject:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    }
})

const Sender = new mongoose.model("SENDER", message);
module.exports = Sender;
