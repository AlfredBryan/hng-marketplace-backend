const mongoose = require('mongoose');
const { sendJSONResponse } = require('../../../helpers');

const Therapist = mongoose.model('Therapist');

module.exports.allTherapists = async (req, res) => {
  const except = {
    _v: false,
    password: false,
    salt: false,
    hash: false,
  };
  const therapist = await Therapist.find({}, except);

  if (therapist) {
    sendJSONResponse(res, 200, therapist, req.method, 'All therapists');
  } else {
    sendJSONResponse(res, 404, null, req.method, 'No therapist  available');
  }
};

// TODO: find working solution for searching
module.exports.search = async (req, res) => {
  const searchKey = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const i of Object.keys(req.body)) {
    if (i !== undefined && i !== null) {
      searchKey[i] = req.body[i];
    }
  }
  //TODO: find solution to this
  const findTherapist = await Therapist.aggregate([
    { $match: searchKey  },
    { '$unwind': '$user' },
    {
      $lookup: {
        from: 'User',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
  ]).exec();
  console.log(findTherapist);

  return sendJSONResponse(res, 200, { therapist: findTherapist }, req.method, 'Therapist fetched');
};

module.exports.marketplace = async (req, res) => {
  const marketplace = await Therapist.find({ available: true });

  if(!marketplace){
    return sendJSONResponse(res, 404, null, req.method, "No therapist available");
  }

  return sendJSONResponse(res, 200, marketplace , req.method, "All therapist available");
}

module.exports.changeStatus = async (req, res) => {
  const { userId } = req.params;

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return sendJSONResponse(res, 400, null, req.method, "Invalid Therapist ID");
  }

  const user = await Therapist.findOne({ user: userId });

  if (!user || user.designation != 'therapist') {
    return sendJSONResponse(res, 404, null, req.method, "Therapist does not exist");
  }

  if (user.available == true) {
    user.available = false;
  }else{
    user.available = true;
  }

  user.save();

  return sendJSONResponse(res, 200, user , req.method, "Status has been changed");
};
