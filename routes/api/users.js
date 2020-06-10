const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const {name, email, password} = req.body;

  // 유효성 검사
  if (!name || !email || !password) {
    return res.status(400).json({ msg: '모든 항목을 입력해주세요.'});
  }

  // 중복 유저 검사
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: '이미 존재하는 이메일 입니다.'});

      const newUser = new User({
        name,
        email,
        password
      });

      // Create Salt & Hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
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
    })
});

module.exports = router;