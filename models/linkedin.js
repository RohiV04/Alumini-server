const mongoose = require("mongoose");
const linkedinSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model("Link", linkedinSchema);
module.exports = Link;
