const mongoose = require('mongoose');

const { Schema } = mongoose;
const requestSchema = new Schema({
  client: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
 },
 therapist: {
    type: Schema.Types.ObjectId,
    ref: 'User',
 },
 status: {
     type: String //pending, accepted, started, rejected, finished
 },
 start: {
    type: Date
 },
 end: {
    type: Date
 }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
