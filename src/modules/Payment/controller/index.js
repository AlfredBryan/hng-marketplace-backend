const mongoose = require('mongoose');
const { sendJSONResponse } = require('../../../helpers');

const User = mongoose.model('User');
const Payment = mongoose.model('Payment');
const Therapist = mongoose.model('Therapist');
const Request = mongoose.model('Request');

/**
   * Make Payment
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
module.exports.makePayment = async (req, res) => {
    const { userId} = req.params;
    const { therapist, number_of_hours, total_fee_charged} = req.body;

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return sendJSONResponse(res, 400, null, req.method, 'Invalid User ID');
      }

    const client = await User.findById(userId);
    const therapy = await User.findById(therapist);

    if(!number_of_hours && !total_fee_charged){
        return sendJSONResponse(res, 400, null, req.method, 'Please complete all fields');
    }

    if(!client){
        return sendJSONResponse(res, 404, null, req.method, 'Client does not exist');
    }

    if(!therapy){
        return sendJSONResponse(res, 404, null, req.method, 'Therapist cannot be found');
    }

    const newPayment = new Payment();
    newPayment.client = userId;
    newPayment.therapist = therapist;

    await newPayment.save();
    sendJSONResponse(res, 201, { newPayment }, req.method, 'Created New Payment!');
};

/**
   * Make Payment
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  module.exports.makeRequest = async (req, res) => {
    const { userId} = req.params;
    const { therapistId } = req.body;

    if (!userId.match(/^[0-9a-fA-F]{24}$/) && !therapistId.match(/^[0-9a-fA-F]{24}$/)) {
        return sendJSONResponse(res, 400, null, req.method, 'Invalid User ID');
      }

    const client = await User.findById(userId);
    const therapist = await User.findById(therapist);

    if(!client && !therapist){
        return sendJSONResponse(res, 404, null, req.method, 'User does not exist');
    }

    const clientStatus = await Request.find({ client:userId, therapist: therapistId});
    for (let i = 0; i < clientStatus.length; i++) {
        const status = clientStatus[i].status;
        if (status != 'completed') {
            return sendJSONResponse(res, 404, null, req.method, 'There is an existing request');
        }
        
    }

    const newRequest = new Request();
    newRequest.client = userId;
    newRequest.therapist = therapistId;
    newRequest.status = 'pending';

    await newRequest.save();
    sendJSONResponse(res, 201, { newRequest }, req.method, 'Created New Therapy Request!');
};