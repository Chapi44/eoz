const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const tenant = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName:{ type: String, required: true },
    businessName: {type:String,required: true,unique: true},
    phoneNumber: { type: String , required: true},
    email: { type: String ,required: true},
    password: {type:String,required: true},
    isActive: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model("AllTenant", tenant,"AllTenant");
