// ============================================================
// DIAGNOSTIC TOOL - Test Backend & Database Connection
// ============================================================

require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('\n');
console.log('╔════════════════════════════════════════════╗');
console.log('║  DIGILIB UMBRES - DIAGNOSTIC TOOL         ║');
console.log('╚════════════════════════════════════════════╝');
console.log('\n');

// ============================================================
// 1. Check Required Files
// ============================================================
console.log('📁 [1] Checking Required Files:');
console.log('');

const requiredFiles = [
  'server.js',
  'db.js',
  'package.json',
  'Login.html',
  'index.html',
  'auth.js',
  '.env'
];

let filesOk = true;
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  const status = exists ? '✅' : '❌';
  console.log(`  ${status} ${file}`);
  if (!exists) filesOk = false;
});

if (!filesOk) {
  console.log('\n⚠️  Some files are missing!');
  console.log('Pastikan Anda di folder proyek yang benar.\n');
  process.exit(1);
}

console.log('\n✅ All files OK\n');

// ============================================================
// 2. Check Node Modules
// ============================================================
console.log('📦 [2] Checking Node Modules:');
console.log('');

const requiredModules = ['express', 'bcrypt', 'mysql2', 'dotenv'];
let modulesOk = true;

requiredModules.forEach(mod => {
  try {
    require.resolve(mod);
    console.log(`  ✅ ${mod}`);
  } catch (e) {
    console.log(`  ❌ ${mod} - NOT INSTALLED`);
    modulesOk = false;
  }
});

if (!modulesOk) {
  console.log('\n❌ Missing dependencies!');
  console.log('\nJalankan: npm install\n');
  process.exit(1);
}

console.log('\n✅ All modules OK\n');

// ============================================================
// 3. Check .env Configuration
// ============================================================
console.log('⚙️  [3] Checking .env Configuration:');
console.log('');

console.log(`  DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
console.log(`  DB_USER: ${process.env.DB_USER || 'root'}`);
console.log(`  DB_PASS: ${process.env.DB_PASS ? '***' : '(empty)'}`);
console.log(`  DB_NAME: ${process.env.DB_NAME || 'digilib'}`);
console.log(`  PORT:    ${process.env.PORT || '3000'}`);

console.log('\n✅ Environment variables loaded\n');

// ============================================================
// 4. Test Database Connection
// ============================================================
console.log('🔌 [4] Testing Database Connection:');
console.log('');

const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'digilib'
    });

    console.log('  ✅ Connected to MySQL');

    // Check if table exists
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`  ✅ Database: ${process.env.DB_NAME || 'digilib'}`);
    console.log(`  ✅ Tables: ${tables.length}`);

    // Check users table
    if (tables.some(t => t.Tables_in_digilib === 'users')) {
      const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
      console.log(`  ✅ Users table found (${users[0].count} records)`);

      // List users
      const [userList] = await connection.execute('SELECT id, nim, username, nama, role FROM users LIMIT 5');
      console.log('\n  Users in database:');
      userList.forEach((user, idx) => {
        console.log(`    ${idx + 1}. [${user.role}] ${user.nama} (${user.username})`);
      });
    } else {
      console.log('  ⚠️  Users table not found');
    }

    await connection.end();
    console.log('\n✅ Database connection OK\n');

    // ============================================================
    // 5. Test Backend
    // ============================================================
    console.log('🚀 [5] Starting Backend Server:');
    console.log('');

    const express = require('express');
    const app = express();
    app.use(express.json());

    const PORT = process.env.PORT || 3000;

    app.get('/', (req, res) => {
      res.json({ status: 'ok', message: 'Backend running' });
    });

    const server = app.listen(PORT, () => {
      console.log(`  ✅ Backend listening on http://localhost:${PORT}`);
      console.log('');
      console.log('╔════════════════════════════════════════════╗');
      console.log('║  ✅ ALL SYSTEMS OK - READY TO LOGIN        ║');
      console.log('╚════════════════════════════════════════════╝');
      console.log('');
      console.log('Next steps:');
      console.log('1. Open browser: http://localhost:3000');
      console.log('2. You should see JSON response');
      console.log('3. Open Login.html in another tab');
      console.log('4. Login with test credentials:');
      console.log('   NIM: 2021001');
      console.log('   Username: mahasiswa1');
      console.log('   Password: password123');
      console.log('');
      console.log('Press Ctrl+C to stop this diagnostic server');
      console.log('Then run: npm start (to start production server)');
      console.log('');
    });

    process.on('SIGINT', () => {
      console.log('\n\nShutting down...');
      server.close(() => {
        console.log('✅ Diagnostic server stopped\n');
        process.exit(0);
      });
    });

  } catch (error) {
    console.log('  ❌ Database connection failed');
    console.log(`  Error: ${error.message}`);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Is MySQL running?');
    console.log('   - Windows: services.msc > MySQL > Start');
    console.log('   - Or use XAMPP Control Panel > Start MySQL');
    console.log('');
    console.log('2. Database exists?');
    console.log('   mysql -u root');
    console.log('   CREATE DATABASE digilib;');
    console.log('   USE digilib;');
    console.log('   source setup.sql;');
    console.log('');
    console.log('3. .env configuration correct?');
    console.log(`   Current: DB_HOST=${process.env.DB_HOST || 'localhost'}, DB_USER=${process.env.DB_USER || 'root'}`);
    console.log('');
    process.exit(1);
  }
})();
