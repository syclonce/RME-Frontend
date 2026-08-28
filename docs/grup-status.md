# Status Implementasi Grup

## Selesai di RME-Frontend

- Fitur manual `src/features/Grup/{api.ts,types.ts,pages/}` sesuai boundary modul backend.
- Dashboard membership read-only, status cabang, pencarian pasien sibling dan snapshot klinis.
- Form rujukan memakai `AsyncCombobox` untuk relasi pasien lokal, pilihan cabang authoritative, validasi dasar, dan workflow terima/tolak.
- Query/mutation memakai TanStack Query dengan invalidasi cache dan refresh daftar rujukan berkala.
- Menu, direct route, dan tombol aksi digerbang oleh `GET /api/v1/me/modules`; tidak ada role yang di-hardcode.

## Terbuka / perlu integrasi

- Contract test end-to-end menunggu RME-License-Hub tersedia.
- Desain error/retry yang lebih rinci, pagination UI, audit banner/consent, dan visualisasi attachment rekam medis belum termasuk versi pertama.
- Backend listener perlu berjalan di deployment agar refresh UI menangkap event Reverb segera setelah mirror lokal diperbarui.
