-- Buat database DIGILIB
CREATE DATABASE IF NOT EXISTS digilib;
USE digilib;

-- Drop table jika sudah ada (untuk fresh install)
DROP TABLE IF EXISTS users;

-- Buat tabel users dengan struktur yang benar
CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nim VARCHAR(32) NOT NULL UNIQUE,
  username VARCHAR(64) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nama VARCHAR(128) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_username (username),
  INDEX idx_nim (nim)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default users (password sudah ter-hash dengan bcrypt)
-- PASSWORD: password123 (hashed)
INSERT INTO users (nim, username, password, nama, role) VALUES
('2021001', 'mahasiswa1', '$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW', 'Andi Pratama', 'user'),
('2021002', 'mahasiswa2', '$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW', 'Siti Nurhaliza', 'user'),
('2021003', 'mahasiswa3', '$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW', 'Budi Santoso', 'user'),
('ADMIN001', 'admin', '$2b$12$L9wz2bLKmFf0rrNqMBNKpO9hHMHJCYHxVZXtJPb5TT5Sm7X1Jq7hW', 'Administrator', 'admin');

-- Tampilkan data yang sudah diinsert
SELECT * FROM users;

-- Verifikasi struktur tabel
DESCRIBE users;
