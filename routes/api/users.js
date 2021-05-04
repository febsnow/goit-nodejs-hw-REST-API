const express = require('express');
const { registration, login, logout, getCurrent } = require('../../controllers/users');
const guard = require('./guard');
const router = express.Router();

router.post('/signup', registration);
router.post('/login', login);
router.post('/logout', guard, logout);
router.get('/current', guard, getCurrent);

module.exports = router;
