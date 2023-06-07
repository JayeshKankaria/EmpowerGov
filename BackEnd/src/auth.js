const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../config');

// Simulated user database
const users = [
  {
    id: 1,
    username: 'user1',
    password: '$2a$10$lLv6zUD0/FbWd0jjIw9Y4O7uLGrIF3gXt8kDZcsVTm0qITgms/G9O', // hashed password: 'password1'
  },
  // Add more users if needed
];

// Generate JWT for user
const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1h', // Token expires in 1 hour
  };
  return jwt.sign(payload, secretKey, options);
};

// User registration
const registerUser = (username, password) => {
  const id = users.length + 1;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id,
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
};

// User login
const loginUser = (username, password) => {
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid username or password');
  }
  return user;
};

module.exports = {
  generateToken,
  registerUser,
  loginUser,
};