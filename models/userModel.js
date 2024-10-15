const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
}, {
  timestamps: true
});

const userModel = model("user", userSchema);
module.exports = userModel;
