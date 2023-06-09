const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pno: {
      type: Number,
      required: true,
      unique: true,
    },
    
    regdno:{
        type:String,
        required: true,
    },
    profess:{
        type:String,
        //required: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
