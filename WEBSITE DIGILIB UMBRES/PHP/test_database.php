<?php
/**
 * TEST_DATABASE.PHP
 * Script untuk test koneksi database sebelum menggunakan sistem
 */

$config_file = 'config.php';

if (!file_exists($config_file)) {
    die('❌ File config.php tidak ditemukan! Pastikan file sudah dibuat.');
}

require_once $config_file;

echo "<!DOCTYPE html>";
echo "<html lang='id'>";
echo "<head>";
echo "    <meta charset='UTF-8'>";
echo "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>";
echo "    <title>Test Database - DIGILIB</title>";
echo "    <style>";
echo "        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }";
echo "        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }";
echo "        h1 { color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px; }";
echo "        .status { padding: 15px; border-radius: 5px; margin: 15px 0; }";
echo "        .success { background: #d4edda; color: #155724; border-left: 4px solid #28a745; }";
echo "        .error { background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545; }";
echo "        .warning { background: #fff3cd; color: #856404; border-left: 4px solid #ffc107; }";
echo "        code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; }";
echo "        table { width: 100%; border-collapse: collapse; margin: 15px 0; }";
echo "        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }";
echo "        th { background: #667eea; color: white; }";
echo "        .test-item { display: flex; align-items: center; margin: 10px 0; }";
echo "        .test-icon { margin-right: 10px; font-size: 20px; }";
echo "        button { background: #667eea; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 10px 0; }";
echo "        button:hover { background: #764ba2; }";
echo "    </style>";
echo "</head>";
echo "<body>";
echo "    <div class='container'>";
echo "        <h1>🔧 Test Database - DIGILIB UMBRES</h1>";

// Test 1: Config File
echo "        <div class='test-item'>";
echo "            <span class='test-icon'>✅</span>";
echo "            <span><strong>config.php</strong> - File ditemukan</span>";
echo "        </div>";

// Test 2: Database Connection
echo "        <h2 style='margin-top: 20px;'>Tes Koneksi Database</h2>";

try {
    // Cek koneksi
    $stmt = $pdo->query("SELECT 1");
    echo "        <div class='status success'>";
    echo "            <strong>✅ Koneksi Database BERHASIL</strong><br>";
    echo "            Database: <code>digilib</code><br>";
    echo "            Host: <code>localhost</code>";
    echo "        </div>";
    
    // Test 3: Check Tables
    echo "        <h2>Tes Tabel Database</h2>";
    
    $tables_needed = [
        'users' => 'Tabel Pengguna',
        'books' => 'Tabel Buku (opsional)',
        'loans' => 'Tabel Peminjaman (opsional)',
    ];
    
    $tables_query = "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'digilib'";
    $existing_tables = [];
    
    foreach ($pdo->query($tables_query) as $row) {
        $existing_tables[] = $row['TABLE_NAME'];
    }
    
    echo "        <table>";
    echo "            <tr><th>Tabel</th><th>Deskripsi</th><th>Status</th></tr>";
    
    foreach ($tables_needed as $table => $desc) {
        $status = in_array($table, $existing_tables) ? '✅ Ada' : '⚠️ Tidak Ada';
        $class = in_array($table, $existing_tables) ? 'success' : 'warning';
        echo "            <tr>";
        echo "                <td><code>$table</code></td>";
        echo "                <td>$desc</td>";
        echo "                <td><strong style='color: " . ($class === 'success' ? '#28a745' : '#ffc107') . "'>$status</strong></td>";
        echo "            </tr>";
    }
    echo "        </table>";
    
    // Test 4: Count Users
    if (in_array('users', $existing_tables)) {
        echo "        <h2>Tes Tabel Users</h2>";
        
        $user_count = $pdo->query("SELECT COUNT(*) as count FROM users")->fetch()['count'];
        $admin_count = $pdo->query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'")->fetch()['count'];
        $user_regular_count = $pdo->query("SELECT COUNT(*) as count FROM users WHERE role = 'user'")->fetch()['count'];
        
        if ($user_count > 0) {
            echo "        <div class='status success'>";
            echo "            <strong>✅ Pengguna Ditemukan</strong><br>";
            echo "            Total: <code>$user_count</code><br>";
            echo "            Admin: <code>$admin_count</code><br>";
            echo "            User: <code>$user_regular_count</code>";
            echo "        </div>";
            
            // List users
            echo "        <h3>Daftar Pengguna</h3>";
            echo "        <table>";
            echo "            <tr><th>Username</th><th>Nama</th><th>Role</th><th>NIM</th></tr>";
            
            foreach ($pdo->query("SELECT username, nama, role, nim FROM users LIMIT 10") as $row) {
                echo "            <tr>";
                echo "                <td><code>{$row['username']}</code></td>";
                echo "                <td>{$row['nama']}</td>";
                echo "                <td>";
                echo "                    <span style='padding: 4px 8px; border-radius: 3px; color: white; background: " 
                     . ($row['role'] === 'admin' ? '#667eea' : '#64b5f6') 
                     . "'>";
                echo "                        " . ucfirst($row['role']);
                echo "                    </span>";
                echo "                </td>";
                echo "                <td>{$row['nim']}</td>";
                echo "            </tr>";
            }
            
            echo "        </table>";
        } else {
            echo "        <div class='status warning'>";
            echo "            <strong>⚠️ Belum Ada Pengguna</strong><br>";
            echo "            Database kosong. Silakan buat pengguna terlebih dahulu atau gunakan <code>generate_hash.php</code>";
            echo "        </div>";
        }
    }
    
} catch (PDOException $e) {
    echo "        <div class='status error'>";
    echo "            <strong>❌ Koneksi Database GAGAL</strong><br>";
    echo "            Error: " . htmlspecialchars($e->getMessage()) . "<br><br>";
    echo "            <strong>Solusi:</strong><br>";
    echo "            1. Pastikan MySQL running<br>";
    echo "            2. Cek config.php - username, password, database name<br>";
    echo "            3. Buat database 'digilib' jika belum ada<br>";
    echo "            4. Jalankan SQL schema dari mysql_schema.sql";
    echo "        </div>";
}

echo "        <h2 style='margin-top: 30px;'>📋 Langkah Selanjutnya</h2>";
echo "        <ol>";
echo "            <li>Pastikan semua status ✅ atau ⚠️</li>";
echo "            <li>Jika ada pengguna, langsung akses <a href='index.php' style='color: #667eea;'>Login</a></li>";
echo "            <li>Jika belum ada pengguna, gunakan <a href='generate_hash.php' style='color: #667eea;'>generate_hash.php</a> untuk membuat akun</li>";
echo "            <li>Kemudian masukkan ke database MySQL</li>";
echo "        </ol>";

echo "        <a href='index.php' style='display: inline-block; margin-top: 20px;'>";
echo "            <button>🚀 Ke Halaman Login</button>";
echo "        </a>";

echo "    </div>";
echo "</body>";
echo "</html>";
?>
