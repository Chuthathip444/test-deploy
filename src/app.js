const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mysql = require('mysql2/promise'); // ใช้สำหรับเชื่อมต่อฐานข้อมูล

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

const corsConfig = {
  origin:"*",
  credential: true,
  methods:["GET","POST","PUT","DELETE"],};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));
// สร้าง connection pool สำหรับเชื่อมต่อฐานข้อมูล
const connection = mysql.createPool(process.env.DATABASE_URL);

// GET: ดึงข้อมูลทั้งหมดจากฐานข้อมูล
app.get('/api/v1/admin', async (req, res, next) => {
  try {
    const [rows] = await connection.query('SELECT * FROM admin'); // เปลี่ยน your_table_name เป็นชื่อ table ของคุณ
    res.json(rows); // ส่งผลลัพธ์ในรูป JSON
  } catch (error) {
    next(error); // ส่งต่อข้อผิดพลาดให้ middleware จัดการ
  }
});

// GET: ดึงข้อมูลทั้งหมดจากฐานข้อมูล
app.get('/api/v1/newreserch', async (req, res, next) => {
  try {
    const [rows] = await connection.query('SELECT * FROM newreserch'); // เปลี่ยน your_table_name เป็นชื่อ table ของคุณ
    res.json(rows); // ส่งผลลัพธ์ในรูป JSON
  } catch (error) {
    next(error); // ส่งต่อข้อผิดพลาดให้ middleware จัดการ
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
