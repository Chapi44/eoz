const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      // unique: true, // Optional, uncomment if username should be unique
    },
    bio: {
      type: String,
    },
    profession: {
      type: String,
      default: "",
    },
    pictures: {
      type: String,
      default: "https://sarada.letsgotnt.com/uploads/profile/pictures-1713961058221.png",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    organazationnumber: {
      type: Number
      
    },
    avaiableStatus: {
      type: String,
      enum: ["available", "full"],
      default: "available",
    },
    fullStatusRevertDate: { // New field to store the date when the status should revert
      type: Date,
    },
    phoneNumber: {
      type: String,
    },
    employmentStatus: {
      type: String,
      enum: ["Active", "On Leave", "Terminated"],
      default: "Active",
    },
    type: {
      type: String,
      enum: ["HomeCare", "HomeHealth", "Hospice", "Palliative", "All"],
    },
    role: {
      type: String,
      default: "user",
      enum: [
        "superadmin",
        "admin",
        "nurses",
        "HR",
        "Therapy",
        "socialworker",
        "doctors",
        "billmanager" // <-- added here
      ],
      required: true,
    },
    
    employeetype: {
      type: Boolean, default: false,
      default: false, // Default value if not specified
    },
    isActive: { type: Boolean,  default: false },
    adminId: {
      type: Schema.Types.ObjectId, 
      ref: "User", // References another user (admin)
      required: false, // Optional, remove if you want it to be required
    },
  },
  { timestamps: true }
);

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
