const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailSchema = new Schema(
  {
    fname: {
      type: String,
      require: true,
    },
    lname: {
      type: String,
      require: true,
    },
    bio: {
      type: String,
    },
    dob: {
      type: Date,
    },
    status: {
      type: String,
    },
    org: {
      type: String,
    },
    profileImg: {
      type: String,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", detailSchema);
module.exports = Customer;
