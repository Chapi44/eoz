const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose; // Import Schema from mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  username:{
    type: String,
    // unique: true,
  },
  bio:{
    type: String
  },
  
  profession: { // Adding the profession field
    type: String
  },
  pictures: {
    type: String,
    // default: "https://sarada.letsgotnt.com/uploads/profile/pictures-1713961058221.png",
  
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  
  organazationnumber:{
    type:Number,
    unique: true,
  },
  phoneNumber:{
    type:String
  },
  type:{
type: String,
enum:["HomeCare", "HomeHealth", "Hospice", "Palliative"]
  },
  role: {
    type: String,
    // enum: ["nurses", "admin"],
    default: "user",
    required: true,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
