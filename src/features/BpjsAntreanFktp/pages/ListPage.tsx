import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "antrean-fktp/antrean"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/antrean/{id}"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/antrean"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/antrean/{antrean}/batal"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/antrean/{antrean}/waktu"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/antrean/{antrean}/waktu"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/antrean/{antrean}/farmasi"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/referensi/poli"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/referensi/dokter/{kodepoli}/{tanggal}"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/referensi/jadwal-dokter/{kodedokter}/{tanggal}"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/referensi/poli-fingerprint"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/referensi/pasien-fingerprint/{norm}"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/jadwal-dokter"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/dashboard/tanggal/{tanggal}/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/dashboard/bulan/{bulan}/{tahun}/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/laporan/tanggal/{tanggal}/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/laporan/kodebooking/{kodebooking}"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/laporan/belum-dilayani/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/laporan/belum-dilayani/{kodepoli}/{kodedokter}/{tanggal}/{jampraktek}"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/mobile-jkn/token"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/mobile-jkn/antrean"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/mobile-jkn/antrean/{kodebooking}"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/mobile-jkn/antrean/{kodebooking}/batal"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/mobile-jkn/antrean/{kodebooking}/checkin"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/mobile-jkn/antrean/{kodebooking}/farmasi"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/mobile-jkn/antrean/{kodebooking}/farmasi"
  },
  {
    "verb": "post",
    "uri": "antrean-fktp/mobile-jkn/pasien-baru"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/mobile-jkn/jadwal-operasi"
  },
  {
    "verb": "get",
    "uri": "antrean-fktp/mobile-jkn/jadwal-operasi/{norm}"
  }
] as const

export function BpjsAntreanFktpListPage() {
  return <ApiConsole moduleName="BpjsAntreanFktp" routes={[...ROUTES]} />
}
