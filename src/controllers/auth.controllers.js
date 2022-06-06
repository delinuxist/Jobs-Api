require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthenticated } = require("../errors");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  const { email } = req.body;

  // const user = await User.findOne({ email: email });

  // check if email already exists
  // if (user) {
  //   throw new BadRequest(`User with email: ${email} already exits`);
  // }

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
  const { email, password } = req.body;

  if (!email && !password) {
    throw new BadRequest("Please provide both email and password");
  }

  if (!email) {
    throw new BadRequest("Please provide email");
  }

  if (!password) {
    throw new BadRequest("Please provide password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthenticated("Invalid Credentials");
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Unauthenticated("Invalid credentials");
  }
  const token = user.createJwt();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.getName(),
    },
    token,
  });
};
