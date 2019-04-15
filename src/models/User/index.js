const mongoose = require('mongoose');
const { sign } = require('jsonwebtoken');
const { jwtsecret } = require('../../config');
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    designation: {
      type: String,
      default: 'normal',
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
      type: Number,
    },
    age: {
      type: String,
    },
  },
<<<<<<< HEAD
  rating: {
    type: Number
  }, 
  age: {
    type: String
  },
 total_fee_charged: {
  type: String
},
total_amount_paid: {
  type: String
}
},
  { timestamps: true }
=======
  { timestamps: true },
>>>>>>> 1b0b5ad60724811b6046a4d2f0ef3332060d2546
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
      expiresIn: '24h',
    },
  );
};

module.exports = mongoose.model('User', userSchema);
