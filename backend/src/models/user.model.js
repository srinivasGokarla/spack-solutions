const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscriptionPlan: {
    type: String,
    default: "Basic",
  },
  stripeCustomerId: {
    type: String,
  },
},{ timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
