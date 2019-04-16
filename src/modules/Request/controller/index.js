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
    const { userId, therapistId } = req.params;
    const { number_of_hours, total_fee_charged} = req.body;

    if (!userId.match(/^[0-9a-fA-F]{24}$/) && !therapistId.match(/^[0-9a-fA-F]{24}$/)) {
        return sendJSONResponse(res, 400, null, req.method, 'Invalid User ID');
      }

    const client = await User.findById(userId);
    const therapist = await User.findOne({ _id:therapistId, designation: "therapist" });

    if(!number_of_hours && !total_fee_charged){
        return sendJSONResponse(res, 400, null, req.method, 'Please complete all fields');
    }

    if(!client){
        return sendJSONResponse(res, 404, null, req.method, 'Client does not exist');
    }

    if(!therapist){
        return sendJSONResponse(res, 404, null, req.method, 'Therapist cannot be found');
    }

    const newPayment = new Payment();
    newPayment.client = userId;
    newPayment.therapist = therapistId;

    await newPayment.save();
    sendJSONResponse(res, 201, { newPayment }, req.method, 'Created New Payment!');
};

/**
   * Make Request For a Professional
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  module.exports.makeRequest = async (req, res) => {
    const { userId} = req.params;
    const { therapistId, start, end } = req.body;

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
        if (status != 'finished') {
            return sendJSONResponse(res, 404, null, req.method, 'There is an existing session');
        }
        
    }

    const newRequest = new Request();
    newRequest.client = userId;
    newRequest.therapist = therapistId;
    newRequest.status = 'pending';
    newRequest.start = start;
    newRequest.end = end;

    await newRequest.save();
    sendJSONResponse(res, 201, { newRequest }, req.method, 'Created New Therapy Request!');
};

/**
   * Accept Request
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  module.exports.acceptRequest = async (req, res) => {
    const { userId} = req.body;
    const { therapistId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/) && !therapistId.match(/^[0-9a-fA-F]{24}$/)) {
        return sendJSONResponse(res, 400, null, req.method, 'Invalid User ID');
      }

    const client = await User.findById(userId);
    const therapist = await User.findById(therapist);

    if(!client && !therapist){
        return sendJSONResponse(res, 404, null, req.method, 'User does not exist');
    }

    const request = await Request.findOne({ client:userId, therapist: therapistId, status: 'pending'});
    
    if(request){
        request.status = 'accepted';

        await request.save();
        return sendJSONResponse(res, 200, { request }, req.method, 'Request accepted');
    }

    sendJSONResponse(res, 400, { newRequest }, req.method, 'No such request');
};

/**
   * Reject Request
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  module.exports.rejectRequest = async (req, res) => {
    const { userId} = req.body;
    const { therapistId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/) && !therapistId.match(/^[0-9a-fA-F]{24}$/)) {
        return sendJSONResponse(res, 400, null, req.method, 'Invalid User ID');
      }

    const client = await User.findById(userId);
    const therapist = await User.findById(therapist);

    if(!client && !therapist){
        return sendJSONResponse(res, 404, null, req.method, 'User does not exist');
    }

    const request = await Request.findOne({ client:userId, therapist: therapistId, status: 'pending'});
    
    if(request){
        request.status = 'rejected';

        await request.save();
        return sendJSONResponse(res, 200, { request }, req.method, 'Request rejected');
    }

    sendJSONResponse(res, 400, { newRequest }, req.method, 'No such request');
};

/**
   * Start Session
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  module.exports.startRequest = async (req, res) => {
    const { userId} = req.body;
    const { therapistId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/) && !therapistId.match(/^[0-9a-fA-F]{24}$/)) {
        return sendJSONResponse(res, 400, null, req.method, 'Invalid User ID');
      }

    const client = await User.findById(userId);
    const therapist = await User.findById(therapist);

    if(!client && !therapist){
        return sendJSONResponse(res, 404, null, req.method, 'User does not exist');
    }

    const request = await Request.findOne({ client:userId, therapist: therapistId, status: 'accepted'});
    
    if(request){
        request.status = 'started';

        await request.save();
        return sendJSONResponse(res, 200, { request }, req.method, 'Therapy has started');
    }

    sendJSONResponse(res, 400, { newRequest }, req.method, 'No such request');
};

/**
   * End Session
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  module.exports.endSession = async (req, res) => {
    const { userId} = req.body;
    const { therapistId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/) && !therapistId.match(/^[0-9a-fA-F]{24}$/)) {
        return sendJSONResponse(res, 400, null, req.method, 'Invalid User ID');
      }

    const client = await User.findById(userId);
    const therapist = await User.findById(therapist);

    if(!client && !therapist){
        return sendJSONResponse(res, 404, null, req.method, 'User does not exist');
    }

    const request = await Request.findOne({ client:userId, therapist: therapistId, status: 'started'});
    
    if(request){
        request.status = 'finished';

        await request.save();
        return sendJSONResponse(res, 200, { request }, req.method, 'Therapy has ended');
    }

    sendJSONResponse(res, 400, { newRequest }, req.method, 'No such request');
};