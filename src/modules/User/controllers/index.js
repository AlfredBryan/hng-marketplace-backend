const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { sendJSONResponse } = require('../../../helpers');

const User = mongoose.model('User');
const Therapy = mongoose.model('Therapist');
const Request = mongoose.model('Request');

module.exports.register = async (req, res) => {
  const { first_name, last_name, email, designation, password } = req.body;
  const findUser = await User.findOne({ email });

  if (findUser) {
    return sendJSONResponse(
      res,
      409,
      null,
      req.method,
      'User Already Exists!',
    );
  }

  const user = new User();
  user.first_name = first_name;
  user.last_name = last_name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);
  
  if (designation) {
    user.designation = designation;
  }
  
  await user.save();
  const token = user.generateJWT(user._id, user.name, user.email, user.designation);
  user.password = undefined;
  sendJSONResponse(res, 200, { token, user }, req.method, 'Created New User!');
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = new User();

  // Get User by Email
  const findUser = await User.findOne({ email });

  if (!findUser) {
    return sendJSONResponse(res, 400, null, req.method, 'User details incorrect');
  }

  const verifyPassword = await bcrypt.compare(password, findUser.password);

  if (!verifyPassword) {
    return sendJSONResponse(res, 400, {}, req.method, 'User details incorrect');
  }

  const token = user.generateJWT(findUser._id, findUser.name, findUser.email, findUser.designation);
  return sendJSONResponse(
    res, 200,
    {
      token,
      id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      admin: findUser.is_admin,
      premium: findUser.is_premium,
    },
    req.method,
    'Login Successful!',
  );
};

module.exports.viewProfile = async (req, res) => {
  const { userId } = req.params;

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return sendJSONResponse(res, 400, null, req.method, "Invalid User ID");
  }

  const user = await User.findById(userId);

  if (user) {
    return sendJSONResponse(res, 200, user, req.method, "View profile");
  }
  
  return sendJSONResponse(res, 400, null, req.method, "User does not exist");
}

/**
   * Leave marketplace
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  module.exports.leaveMarket = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return sendJSONResponse(res, 400, null, req.method, 'Invalid User ID');
    }
  
    const user = await User.findById(userId);
  
    if (user === null) {
      return sendJSONResponse(res, 404, null, req.method, 'User Not Found');
    }
  
    // delete user
    const findRequest = await Request.find({therapist: userId});
    for (let i = 0; i < findRequest.length; i++) {
      const status = findRequest[i].status;

      if (status != 'finished') {
        console.log(findRequest[i]);
        await findRequest.save();
      }
    }
    await User.findOneAndRemove({ _id: userId });
    await Therapy.findOneAndRemove({ user: userId });
  
    sendJSONResponse(
      res,
      200,
      null,
      req.method,
      'User Deleted Successfully',
    );
  };

