const User = require('../service/schemas/users');

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByVerifyToken = async (token) => {
  return await User.findOne({ verifyToken: token });
};

const findByToken = async (token) => {
  return await User.findOne({ token });
};

const create = async (userOptions) => {
  const user = new User(userOptions);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token: token });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatarURL: avatar });
};

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken });
};

module.exports = {
  findById,
  findByEmail,
  findByToken,
  create,
  updateToken,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
};
