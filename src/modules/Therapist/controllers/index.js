const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { sendJSONResponse } = require("../../../helpers");

const Therapist = mongoose.model("Therapist");

module.exports.updateTherapist = async (req, res) => {
  const {
    phone,
    country,
    address,
    years_of_experience,
    last_working_experience,
    password,
  } = req.body;
  const { Id } = req.params;

  if (!Id.match(/^[0-9a-fA-F]{24}$/)) {
    return sendJSONResponse(res, 400, null, req.method, "Invalid Therapist ID");
  }

  const therapist = await Therapist.findById(Id);

  if (therapist) {
    if (phone) {
      therapist.phone = phone;
    }
    if (country) {
      therapist.country = country;
    }
    if (address) {
      therapist.address = address;
    }
    if (years_of_experience) {
      therapist.years_of_experience = years_of_experience;
    }
    if (last_working_experience) {
      therapist.last_working_experience = last_working_experience;
    }
    if (password) {
      therapist.password = bcrypt.hashSync(password, 10);
    }

    therapist.save();
    return sendJSONResponse(
      res,
      200,
      {
        id: therapist._id,
        phone: therapist.phone,
        country: therapist.country,
        address: therapist.address,
        years_of_experience: therapist.years_of_experience,
        last_working_experience: therapist.last_working_experience
      },
      req.method,
      "Therapist Updated Succesfully!"
    );
  } else {
    return sendJSONResponse(res, 409, null, req.method, "Therapist not Found!");
  }
};

module.exports.allTherapists = async (req, res) => {
  const except = {
    _v: false,
    password: false,
    salt: false,
    hash: false,
  };
  const therapist = await Therapist.find({}, except);

  if (therapist) {
    sendJSONResponse(res, 200, therapist, req.method, "All therapists");
  } else {
    sendJSONResponse(res, 404, null, req.method, "No therapist  available");
  }
};

module.exports.viewTherapist = async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return sendJSONResponse(res, 400, null, req.method, "Invalid Therapist ID");
  }

  const therapist = await Therapist.findOne({ _id: id });

  if (therapist === null) {
    return sendJSONResponse(res, 404, null, req.method, "Therapist Not Found");
  }

  sendJSONResponse(
    res,
    200,
    {
      id: therapist._id,
      phone: therapist.phone,
      country: therapist.country,
      address: therapist.address,
      years_of_experience: therapist.years_of_experience,
      last_working_experience: therapist.last_working_experience,
      time_available: therapist.time_available,
      fee_per_hour: therapist.fee_per_hour,
      status: therapist.status,
    },
    req.method,
    "View Therapist"
  );
};
// TODO: test if .find.populate works
// else use aggregate
module.exports.search = async (req, res) => {
  const searchKey = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const i of Object.keys(req.body)) {
    if (i !== undefined && i !== null) {
      searchKey[i] = req.body[i];
    }
  }

  const findTherapist = Therapist.findOne({ searchKey })
    .populate({
      path: 'User',
      select: 'first_name last_name',
    })
    .exec();

  return sendJSONResponse(res, 200, { therapist: findTherapist }, req.method, 'Therapist fetched');
};

