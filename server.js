require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 12;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// CORS Middleware
// ============================================================
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Content-Type', 'application/json');
  next();
});

app.options('*', (req, res) => {
  res.sendStatus(200);
});

// ============================================================
// Health Check Endpoint
// ============================================================
app.get('/', (req, res) => {
  res.json({ 
    message: 'DIGILIB UMBRES backend berjalan',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// ============================================================
// Register Endpoint
// ============================================================
app.post('/register', async (req, res) => {
  const { nim, username, password, nama, role = 'user' } = req.body;

  if (!nim || !username || !password || !nama) {
    return res.status(400).json({ 
      success: false,
      error: 'Field nim, username, password, dan nama wajib diisi.' 
    });
  }

  try {
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE username = ? OR nim = ?',
      [username, nim]
    );

    if (existing.length > 0) {
      return res.status(409).json({ 
        success: false,
        error: 'Username atau NIM sudah terdaftar.' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.query(
      'INSERT INTO users (nim, username, password, nama, role) VALUES (?, ?, ?, ?, ?)',
      [nim, username, hashedPassword, nama, role]
    );

    return res.status(201).json({ 
      success: true,
      message: 'Akun berhasil dibuat. Password dienkripsi dengan bcrypt.' 
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Gagal membuat akun. ' + error.message 
    });
  }
});

// ============================================================
// Login Endpoint
// ============================================================
app.post('/login', async (req, res) => {
  const { nim, username, password } = req.body;

  if (!nim || !username || !password) {
    return res.status(400).json({ 
      success: false,
      error: 'NIM, username, dan password wajib diisi.' 
    });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, nim, username, password, nama, role FROM users WHERE username = ? AND nim = ?',
      [username, nim]
    );

    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false,
        error: 'NIM, username, atau password salah.' 
      });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'NIM, username, atau password salah.' 
      });
    }

    const userProfile = {
      id: user.id,
      nim: user.nim,
      username: user.username,
      nama: user.nama,
      role: user.role
    };

    return res.json({ 
      success: true,
      message: 'Login berhasil.',
      user: userProfile 
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Gagal melakukan login. ' + error.message 
    });
  }
});

// ============================================================
// 404 Handler
// ============================================================
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Endpoint tidak ditemukan',
    path: req.path
  });
});

// ============================================================
// Start Server
// ============================================================
app.listen(PORT, () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║  DIGILIB UMBRES - Backend Server                  ║');
  console.log('╠═══════════════════════════════════════════════════╣');
  console.log(`║  🚀 Server berjalan pada: http://localhost:${PORT}     ║`);
  console.log('║  📧 Database: ' + process.env.DB_NAME || 'digilib' + '                    ║');
  console.log('║  👤 Database User: ' + process.env.DB_USER || 'root' + '               ║');
  console.log('╚═══════════════════════════════════════════════════╝');
  console.log('');
  console.log('Available Endpoints:');
  console.log('  GET  http://localhost:' + PORT + '/           → Health check');
  console.log('  POST http://localhost:' + PORT + '/register   → Daftar user baru');
  console.log('  POST http://localhost:' + PORT + '/login      → Login');
  console.log('');
});

// ============================================================
// Graceful Shutdown
// ============================================================
process.on('SIGINT', async () => {
  console.log('\n\nMenutup koneksi database...');
  await pool.end();
  process.exit(0);
});

app.post('/register', async (req, res) => {
  const { nim, username, password, nama, role = 'user' } = req.body;

  if (!nim || !username || !password || !nama) {
    return res.status(400).json({ error: 'Field nim, username, password, dan nama wajib diisi.' });
  }

  try {
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE username = ? OR nim = ?',
      [username, nim]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Username atau NIM sudah terdaftar.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.query(
      'INSERT INTO users (nim, username, password, nama, role) VALUES (?, ?, ?, ?, ?)',
      [nim, username, hashedPassword, nama, role]
    );

    return res.status(201).json({ message: 'Akun berhasil dibuat. Password dienkripsi dengan bcrypt.' });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Gagal membuat akun. Periksa konfigurasi database.' });
  }
});

app.post('/login', async (req, res) => {
  const { nim, username, password } = req.body;

  if (!nim || !username || !password) {
    return res.status(400).json({ 
      success: false,
      error: 'NIM, username, dan password wajib diisi.' 
    });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, nim, username, password, nama, role FROM users WHERE username = ? AND nim = ?',
      [username, nim]
    );

    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false,
        error: 'NIM, username, atau password salah.' 
      });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'NIM, username, atau password salah.' 
      });
    }

    const userProfile = {
      id: user.id,
      nim: user.nim,
      username: user.username,
      nama: user.nama,
      role: user.role
    };

    return res.json({ 
      success: true,
      message: 'Login berhasil.',
      user: userProfile 
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Gagal melakukan login. ' + error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server backend DIGILIB UMBRES berjalan pada http://localhost:${PORT}`);
});
