# Global Chat — catatan integrasi review

Panel kanan memakai komponen Global Chat dari `global-chat-complete.zip`. Fitur sumbernya meliputi:

- Membaca 50 pesan terbaru secara publik dan memperbarui feed tiap 15 detik.
- Profil ringan berbasis `localStorage`, nama panggilan 2–24 karakter, serta username X/Telegram yang opsional dan ditampilkan secara publik.
- Pengiriman pesan maksimal 300 karakter.
- Halaman admin di `/admin` untuk membalas dan menghapus pesan.
- Neon Postgres dengan tabel `global_messages`; fungsi SQL membatasi retensi ke 100 pesan terbaru.
- Pembatasan frekuensi per profil dan IP, serta penguncian login admin. Batas ini in-memory per instance dan tidak dibagi lintas instance serverless, sesuai catatan di ZIP.

## Konfigurasi yang diperlukan untuk mengaktifkannya

1. Siapkan `DATABASE_URL`, `SESSION_SECRET` (minimal 32 karakter), dan `ADMIN_PASSWORD_HASH` (SHA-256 dari password admin) pada environment lokal.
2. Setelah persetujuan eksplisit, jalankan `sql/001_global_chat.sql` pada database Neon yang dipilih.
3. Muat ulang preview dan pastikan akses `/api/chat` berstatus siap sebelum membuka pengiriman pesan.

Preview saat ini sengaja **belum tersambung ke Neon**: halaman chat menampilkan status offline dengan jelas; tidak membaca atau menyimpan pesan. Proyek Neon yang tersedia bernama `neon-dropchoice` saat diperiksa masih belum memiliki tabel public, dan belum ada tiga variabel environment di salinan lokal. Tidak ada perubahan database yang dilakukan.

## Catatan privasi/operasional

Handle kontak pengunjung bersifat publik. Tinjau dan setujui kebijakan moderasi sebelum chat dibuka luas. Batas in-memory adalah perlindungan MVP, bukan rate limit terdistribusi.
