const express = require('express');
const passport = require('passport');
const { join, login, logout } = require('../controllers/auth');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares');
const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join);
// POST /auth/login
router.post('/login', isNotLoggedIn, login);
// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;
