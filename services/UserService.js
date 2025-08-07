import User from '../db/models/User.js';

const getUsersFromDB = async (req, res) => {
  return User.findAll();
};

const createUserToDB = async (userData) => {
  await User.create(userData);
};

export { getUsersFromDB, createUserToDB };
