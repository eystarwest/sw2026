const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');

function register({ name, email, password }) {
  if (!name || !email || !password) {
    throw new ApiError(400, 'name, email and password are required');
  }
  if (userModel.findByEmail(email)) {
    throw new ApiError(409, 'A user with this email already exists');
  }
  const user = userModel.create({ name, email, password });
  return { id: user.id, name: user.name, email: user.email };
}

function login({ email, password }) {
  if (!email || !password) {
    throw new ApiError(400, 'email and password are required');
  }
  const user = userModel.findByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new ApiError(401, 'Invalid email or password');
  }
  const token = jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
  return { token };
}

module.exports = { register, login };
