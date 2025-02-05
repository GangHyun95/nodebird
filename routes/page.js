const express = require('express');
const router = express.Router();
const {
    renderJoin,
    renderMain,
    renderProfile,
} = require('../controllers/page');

// 라우터들이 공통으로 사용할 수 있는 변수들
router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];
    next();
});

router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);

module.exports = router;
