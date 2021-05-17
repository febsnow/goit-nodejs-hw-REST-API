const express = require('express');
const validation = require('./users-validation-schema');
const {
  registration,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verify,
  repeatEmailVerification,
} = require('../../controllers/users');
const guard = require('../../helpers/guard');
const router = express.Router();
const uploadAvatar = require('../../helpers/upload-avatar');

router.post('/signup', validation.validateUser, registration);
router.post('/login', validation.validateUser, login);
router.post('/logout', guard, logout);
router.get('/current', guard, getCurrent);
router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatar);
router.get('/verify/:verificationToken', verify);
router.post('/verify', validation.validateVerifyEmail, repeatEmailVerification);

module.exports = router;
