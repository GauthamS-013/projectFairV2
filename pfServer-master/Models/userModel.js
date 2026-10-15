const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },
    providerId: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    linkdin: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const users = mongoose.model("users", userSchema);

module.exports = users;
