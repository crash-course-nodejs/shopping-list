const express = require('express');
const mongoose = require('mongoose'); // ORM with mongoDB, mongoDB Driver can use it.
const path = require('path');
const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

mongoose.set('useCreateIndex', true);

// Use Routes
// http://localhost:5000/api/items
app.use('/api/items', require('./routes/api/items'));
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));

// 프로덕션 모드일 때
if (process.env.NODE_ENV === 'production') {
  // static 폴더 설정
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000; // Heroku 의 포트

app.listen(port, () => console.log(`Server started on port ${port}`));