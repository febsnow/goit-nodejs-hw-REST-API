const express = require('express');
const { registration, login, logout, getCurrent, updateAvatar } = require('../../controllers/users');
const guard = require('../../helpers/guard');
const router = express.Router();
const uploadAvatar = require('../../helpers/upload-avatar');

router.post('/signup', registration);
router.post('/login', login);
router.post('/logout', guard, logout);
router.get('/current', guard, getCurrent);
router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatar);

module.exports = router;
