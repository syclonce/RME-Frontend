# Asumsi Kontrak Grup Realtime–Hub

Tanggal: 2026-08-28. RME-License-Hub belum berisi kontrak saat implementasi dimulai. UI hanya berbicara ke RME-Backend lokal; token hub, HMAC, alamat cabang, dan kredensial Reverb tidak pernah berada di browser.

## Endpoint backend lokal yang dipakai UI

- `GET /api/v1/me/modules`: source of truth visibilitas modul dan permission aksi. Modul `Grup` hanya tampil jika ada di `data.modules`; tombol sinkronisasi/buat/ubah rujukan memakai permission `grup.*` yang dikembalikan endpoint ini.
- `GET /api/v1/grup/context` dan `POST /api/v1/grup/context/sync`.
- `GET /api/v1/grup/patients?branch_id=&q=` serta `GET /api/v1/grup/patients/{branch_uuid}/{patient_id}`.
- `GET|POST /api/v1/grup/referrals` dan `PATCH /api/v1/grup/referrals/{uuid}/status`.

Respons list mengikuti salah satu paginator Laravel yang sudah dinormalisasi helper frontend. Hasil pencarian pasien wajib menyertakan `branch_id` ketika query mencakup lebih dari satu cabang.

## Realtime

Backend instance—bukan browser—subscribe ke Reverb hub pada private channel `private-grup.instance.{instance_id}`, event `grup.notification`. Browser merefresh daftar rujukan dari backend lokal setiap 15 detik. Ini sengaja menjaga kredensial service-to-service di server dan mempertahankan REST sebagai jalur pengambilan PHI.

Payload Reverb hanya pointer non-PHI: `{event_id,type,resource_id,source_branch_id,version,occurred_at}`. Isi pasien/rujukan tidak boleh dipancarkan lewat WebSocket.

Kontrak lengkap, HMAC, endpoint hub, serta daftar keputusan yang masih terbuka ada pada dokumen bernama sama di RME-Backend.
