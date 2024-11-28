const app = require('./app'); 
require('dotenv').config(); // โหลดค่าจาก .env
const mysql = require('mysql2/promise'); // ใช้สำหรับเชื่อมต่อฐานข้อมูล
const cors = require('cors');
const { createServer } = require('http'); // ใช้ HTTP server ที่เหมาะสม

const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// ใช้ CORS
app.options(" ", cors(corsConfig));
app.use(cors(corsConfig));

const connection = mysql.createPool(process.env.DATABASE_URL);

// ทดสอบการเชื่อมต่อฐานข้อมูล
async function testDatabaseConnection() {
  try {
    const conn = await connection.getConnection();
    console.log('✅ Successfully connected to the database');
    conn.release(); 
  } catch (error) {
    console.error('❌ Failed to connect to the database', error.message);
    process.exit(1); // หยุดการทำงานหากการเชื่อมต่อล้มเหลว
  }
}

// เริ่มต้นแอปพลิเคชันหลังจากการทดสอบฐานข้อมูลสำเร็จ
testDatabaseConnection().then(() => {
  const port = process.env.PORT || 4000;
  const server = createServer(app); // สร้าง HTTP server จาก app
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

// ส่งออก server เพื่อให้ Vercel ใช้
module.exports = createServer(app);
