const { token } = require('morgan');
const passport = require('passport');
const { HttpCode } = require('../../service/http-codes');
require('../../config/config-passport');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    console.log('guard');
    let token = null;
    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1];
    }

    if (!user || error || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
