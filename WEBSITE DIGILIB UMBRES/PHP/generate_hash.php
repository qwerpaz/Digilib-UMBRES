<?php
/**
 * GENERATE_HASH.PHP
 * 
 * Gunakan script ini untuk generate password hash
 * 
 * Cara pakai:
 * 1. Edit $passwords sesuai kebutuhan
 * 2. Jalankan di browser: http://localhost:8000/generate_hash.php
 * 3. Copy hash yang dihasilkan ke database
 */

$passwords = [
    'admin' => 'admin123',      // Ubah sesuai password yang diinginkan
    'user1' => 'user12345',
];

echo "<h1>Password Hash Generator</h1>";
echo "<table border='1' cellpadding='10'>";
echo "<tr><th>Username</th><th>Password</th><th>Hash</th><th>SQL Insert</th></tr>";

foreach ($passwords as $username => $password) {
    $hash = password_hash($password, PASSWORD_BCRYPT);
    
    echo "<tr>";
    echo "<td><strong>$username</strong></td>";
    echo "<td><code>$password</code></td>";
    echo "<td><code>" . htmlspecialchars($hash) . "</code></td>";
    echo "<td>";
    echo "Copy hash untuk INSERT ke database";
    echo "</td>";
    echo "</tr>";
}

echo "</table>";

echo "<hr>";
echo "<h2>🔒 Keamanan Password</h2>";
echo "<ul>";
echo "<li>✅ Gunakan password yang kuat (minimal 8 karakter)</li>";
echo "<li>✅ Setiap hash berbeda meski password sama (karena salt random)</li>";
echo "<li>✅ Jangan pernah share password di plaintext</li>";
echo "<li>✅ Hash hanya berlaku untuk bcrypt PASSWORD_BCRYPT</li>";
echo "</ul>";

echo "<hr>";
echo "<h3>Contoh SQL INSERT:</h3>";
echo "<pre>";
echo "INSERT INTO users (nim, username, password, nama, role) VALUES ";
echo "('123456', 'admin', '". password_hash('admin123', PASSWORD_BCRYPT) ."', 'Admin', 'admin'),";
echo "('654321', 'user1', '". password_hash('user12345', PASSWORD_BCRYPT) ."', 'User 1', 'user');";
echo "</pre>";

echo "<hr>";
echo "<h2>Untuk Verifikasi Password di PHP:</h2>";
echo "<pre>";
echo "if (password_verify(\$input_password, \$hash_dari_db)) {";
echo "    echo 'Password benar!';";
echo "}";
echo "</pre>";
?>
