const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'digilib',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

// Test koneksi saat startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database terkoneksi: ' + (process.env.DB_NAME || 'digilib'));
    connection.release();
  } catch (error) {
    console.error('❌ ERROR Koneksi Database:');
    console.error('   Host: ' + (process.env.DB_HOST || 'localhost'));
    console.error('   User: ' + (process.env.DB_USER || 'root'));
    console.error('   Database: ' + (process.env.DB_NAME || 'digilib'));
    console.error('   Error: ' + error.message);
    console.error('\n   Pastikan:');
    console.error('   1. MySQL service sudah running');
    console.error('   2. Database sudah dibuat');
    console.error('   3. File .env sudah dikonfigurasi dengan benar');
  }
})();

module.exports = pool;
