import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "antrean-rs/antrean"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/antrean/{id}"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/antrean"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/antrean/{antrean}/batal"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/antrean/{antrean}/waktu"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/antrean/{antrean}/waktu"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/antrean/{antrean}/farmasi"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/referensi/poli"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/referensi/dokter/{kodepoli}/{tanggal}"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/referensi/jadwal-dokter/{kodedokter}/{tanggal}"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/referensi/poli-fingerprint"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/referensi/pasien-fingerprint/{norm}"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/jadwal-dokter"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/dashboard/tanggal/{tanggal}/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/dashboard/bulan/{bulan}/{tahun}/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/laporan/tanggal/{tanggal}/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/laporan/kodebooking/{kodebooking}"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/laporan/belum-dilayani/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/laporan/belum-dilayani/{kodepoli}/{kodedokter}/{tanggal}/{jampraktek}"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/mobile-jkn/token"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/mobile-jkn/antrean"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/mobile-jkn/antrean/{kodebooking}"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/mobile-jkn/antrean/{kodebooking}/batal"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/mobile-jkn/antrean/{kodebooking}/checkin"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/mobile-jkn/antrean/{kodebooking}/farmasi"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/mobile-jkn/antrean/{kodebooking}/farmasi"
  },
  {
    "verb": "post",
    "uri": "antrean-rs/mobile-jkn/pasien-baru"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/mobile-jkn/jadwal-operasi"
  },
  {
    "verb": "get",
    "uri": "antrean-rs/mobile-jkn/jadwal-operasi/{norm}"
  }
] as const

export function BpjsAntreanRsListPage() {
  return <ApiConsole moduleName="BpjsAntreanRs" routes={[...ROUTES]} />
}
