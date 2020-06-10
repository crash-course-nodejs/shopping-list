const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const {email, password} = req.body;

  // 유효성 검사
  if (!email || !password) {
    return res.status(400).json({ msg: '모든 항목을 입력해주세요.'});
  }

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: '존재하지 않는 회원 입니다.'});

      // 비밀번호 검사
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) return res.status(400).json({ msg: '비밀번호를 확인해 주세요.'});

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );              
        });
    });
});

// @route   GET api/auth/user
// @desc    Get user data without password ('미들웨어를 먼저 거치기 때문에 jwt토큰이 유효하면, req.user 가 들어있음.')
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password') /* 패스워드 제외한 필드 가져오기 */
    .then(user => res.json(user));
});

module.exports = router;