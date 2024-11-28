const app = require('./app');
require('dotenv').config(); // โหลดค่าจาก .env
const mysql = require('mysql2/promise'); // ใช้สำหรับเชื่อมต่อฐานข้อมูล
const cors = require('cors');
const corsConfig = {
  origin:"*",
  credential: true,
  methods:["GET","POST","PUT","DELETE"],
};
app.options(" ", cors(corsConfig));
app.use(cors(corsConfig));


const connection = mysql.createPool(process.env.DATABASE_URL);

// ทดสอบการเชื่อมต่อฐานข้อมูล
async function testDatabaseConnection() {
  try {
    const conn = await connection.getConnection();
    console.log('✅ Successfully');
    conn.release(); 
  } catch (error) {
    console.error('❌ Failed', error.message);
    process.exit(1); 
  }
}

// เริ่มต้นแอปพลิเคชันหลังจากการทดสอบฐานข้อมูลสำเร็จ
testDatabaseConnection().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
});

// ส่งออก connection เพื่อใช้งานในไฟล์อื่น
module.exports = connection;
