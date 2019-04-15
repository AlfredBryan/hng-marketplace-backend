const mongoose = require("mongoose");

const { Schema } = mongoose;
const therapistSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    phone: {
      type: String
    },
    country: {
      type: String
    },
    address: {
      type: String
    },
    years_of_experience: {
      type: Number
    },
    last_working_experience: {
      type: String
    },
    time_available: {
      type: String
    },
    fee_per_hour: {
      type: String
    },
    available: {
      type: Boolean
    },
    bank_account: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Therapist", therapistSchema);
