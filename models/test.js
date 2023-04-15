const mongoose = require("mongoose");
const testSchema = mongoose.Schema(
  {
    reg: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
