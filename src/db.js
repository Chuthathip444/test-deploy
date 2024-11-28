const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

(async () => {
  try {
    pool = mysql.createPool({
      host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com', // ใช้ host จาก URL
      user: 'jthBBZwkYtCL4RN.root', // ใช้ user จาก URL
      password: 'MJPgExL9zgd1mfsL', // ใช้ password จาก URL
      database: 'mydb', // ใช้ชื่อ database จาก URL
      port: 4000, // ใช้ port จาก URL
      ssl: {
        rejectUnauthorized: true, // ใช้ SSL เพื่อความปลอดภัย
      },
    });

    console.log('Database connection pool created successfully!');
  } catch (error) {
    console.error('Failed to create database connection pool:', error.message);
    process.exit(1); // หยุดการทำงานหากการเชื่อมต่อล้มเหลว
  }
})();

module.exports = pool;
