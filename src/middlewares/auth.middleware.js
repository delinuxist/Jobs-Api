const { Unauthenticated } = require("../errors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.jwtSecret;

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("No token provided or Wrong token format");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, secret);

    req.user = {
      userId: payload.userId,
      name: payload.name,
    };
  } catch (err) {
    throw new Unauthenticated("Token expired can't access route");
  }

  next();
};

module.exports = AuthMiddleware;
