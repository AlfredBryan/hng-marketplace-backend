const mongoose = require('mongoose');
const { sign } = require('jsonwebtoken');
const { jwtsecret } = require('../../config');

const { Schema } = mongoose;
const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  designation: {
    type: String,
  },
  is_admin: {
    type: Boolean,
  },
  is_therapist: {
    type: Boolean
  },
  image: {
    type: String,
  },
  imageId: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  last_seen: {
    type: String,
  },
  rating: {
    type: Number
  }, 
  age: {
    type: String
  }
},
  { timestamps: true }
);


userSchema.methods.generateJWT = function generate(_id, name, email, admin) {
  return sign(
    {
      _id,
      name,
      email,
      admin,
    },
    jwtsecret,
    {
      expiresIn: "24h"
    }
  );
};

module.exports = mongoose.model("User", userSchema);
