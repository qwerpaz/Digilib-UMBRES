<?php
$host   = "sql108.infinityfree.com";
$user   = "if0_42393694";
$pass   = "DI6ILI8UM81235";
$db     = "if0_42393694_digilib_umbres";

$conn = mysqli_xconnect($host, $user, $pass, $db);

if (!$conn) {
    die("koneksi database gagal");
}