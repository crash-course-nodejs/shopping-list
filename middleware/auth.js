const config = require('config');
const jwt = require('jsonwebtoken');
 
function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // 토큰 검사
  if (!token) res.status(401).json({ msg: '인증 토큰이 존재하지 않습니다.'});

  try {
    // 토큰 유효성 검사
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // 페이로드로부터 유저 추가
    req.user = decoded;
    next();
  } catch(e) {
    res.status(400).json({ msg: '유효하지 않은 인증 토큰입니다.'});
  }
}

module.exports = auth;