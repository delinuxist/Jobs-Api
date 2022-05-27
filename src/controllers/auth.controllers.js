require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  // check if email already exists
  if (user) {
    throw new BadRequest(`User with email: ${email} already exits`);
  }

  const newUser = await User.create({ ...req.body });

  const token = await newUser.createJwt();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: newUser.getName(),
    },
    token,
  });
};

exports.login = async (req, res) => {
  res.send("login");
};
