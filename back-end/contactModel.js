const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name:{type:String,required:true},
    phone:{type:Number,required:true},
    email:{type:String,required:true,unique:true},
    socialMedia:{type:String,required:true}
})

const contactModel = new mongoose.model("contactData",contactSchema)


module.exports = contactModel;