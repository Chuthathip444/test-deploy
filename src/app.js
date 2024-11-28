const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const pool = require('./db'); // เรียกใช้งาน connection pool

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

// ตั้งค่า CORS
const corsConfig = {
  origin: '*',
  credential: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.options('*', cors(corsConfig));
app.use(cors(corsConfig));

// GET: ดึงข้อมูลจากฐานข้อมูล (ตัวอย่าง table admin)
app.get('/api/v1/admin', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM admin');
    res.json(rows);
  } catch (error) {
    next(error); // ส่งต่อข้อผิดพลาดให้ middleware จัดการ
  }
});

// GET: ดึงข้อมูลจากฐานข้อมูล (ตัวอย่าง table newreserch)
app.get('/api/v1/newreserch', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM newreserch');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
