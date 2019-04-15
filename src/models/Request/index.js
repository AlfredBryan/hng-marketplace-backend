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
     type: String
 }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
