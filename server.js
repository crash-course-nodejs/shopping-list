const express = require('express');
const mongoose = require('mongoose'); // ORM with mongoDB, mongoDB Driver can use it.
const bodyParser = require('body-parser'); // express 의 res, req 의 body를 처리하는 미들웨어

// api/items/*
const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000; // Heroku 의 포트

app.listen(port, () => console.log(`Server started on port ${port}`));



