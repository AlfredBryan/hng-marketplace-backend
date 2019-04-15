const mongoose = require('mongoose');

const { Schema } = mongoose;
const paymentSchema = new Schema({
  client: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
 },
 request: {
   type: Schema.Types.ObjectId,
   ref: 'Request'
 },
 therapist: {
    type: Schema.Types.ObjectId,
    ref: 'User',
 },
 number_of_hours: {
     type: String,
 },
 total_fee_charged: {
     type: String
 }

}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
