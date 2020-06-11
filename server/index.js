const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');
const config = require('./config/key');
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected.. '))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

// 회원가입에 필요한 정보를 Client에서 전달받아 DB에 넣는다.
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 db에서 조회함.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '이메일을 찾을 수 없습니다.'
      });
    }
    // 요청한 이메일이 db에 있다면 비밀번호가 맞는지 확인함.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호 오류입니다.'
        });
      }
      // 비밀번호가 맞다면 토큰을 생성함.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장한다.
        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id
        });
      });
    });
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  // auth 성공했을 경우 코드 실행됨.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role !== 0,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
