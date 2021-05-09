const Users = require('../model/users');
const jwt = require('jsonwebtoken');
const jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');
const { HttpCode } = require('../helpers/http-codes');
const User = require('../service/schemas/users');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already use',
    });
  }
  try {
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);

  const isValidPassword = user && (await user.validPassword(password));

  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Check your email or password',
    });
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  await Users.updateToken(user.id, token);
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { token },
  });
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  console.log('controller');
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { email, subscription },
  });
};

const logout = async (req, res, next) => {
  const id = req.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const avatarUrl = await saveAvatar(req);
  await Users.updateAvatar(id, avatarUrl);
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { avatarUrl },
  });
};

const saveAvatar = async (req) => {
  const AVATARS_FOLDER = process.env.AVATARS_FOLDER;
  const filePath = req.file.path;
  const newAvatarName = `${Date.now().toString()}-${req.file.originalname}`;
  const tempImg = await jimp.read(filePath);
  await tempImg
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(filePath);
  try {
    await fs.rename(filePath, path.join(process.cwd(), 'public', AVATARS_FOLDER, newAvatarName));
  } catch (error) {
    console.log(error.message);
  }

  const oldAvatar = req.user.avatarURL;

  if (oldAvatar && oldAvatar.includes(AVATARS_FOLDER)) {
    await fs.unlink(path.join(process.cwd(), 'public', oldAvatar));
  }
  return path.join(AVATARS_FOLDER, newAvatarName);
};

module.exports = { registration, login, getCurrent, logout, updateAvatar };
