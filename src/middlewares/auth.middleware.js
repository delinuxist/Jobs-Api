const { Unauthenticated } = require("../errors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.jwtSecret;

const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("No token provided or Wrong token format");
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, secret);
    console.log(user);
  } catch (err) {
    throw new Unauthenticated("Token expired can't access route");
  }

  next();
};

module.exports = AuthMiddleware;
