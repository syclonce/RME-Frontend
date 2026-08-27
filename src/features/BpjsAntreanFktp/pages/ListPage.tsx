import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "antrean"
  },
  {
    "verb": "get",
    "uri": "antrean/{id}"
  },
  {
    "verb": "post",
    "uri": "antrean"
  },
  {
    "verb": "post",
    "uri": "antrean/{antrean}/batal"
  },
  {
    "verb": "get",
    "uri": "antrean/{antrean}/waktu"
  },
  {
    "verb": "post",
    "uri": "antrean/{antrean}/waktu"
  },
  {
    "verb": "post",
    "uri": "antrean/{antrean}/farmasi"
  },
  {
    "verb": "get",
    "uri": "poli"
  },
  {
    "verb": "get",
    "uri": "dokter/{kodepoli}/{tanggal}"
  },
  {
    "verb": "get",
    "uri": "jadwal-dokter/{kodedokter}/{tanggal}"
  },
  {
    "verb": "get",
    "uri": "poli-fingerprint"
  },
  {
    "verb": "get",
    "uri": "pasien-fingerprint/{norm}"
  },
  {
    "verb": "post",
    "uri": "jadwal-dokter"
  },
  {
    "verb": "get",
    "uri": "dashboard/tanggal/{tanggal}/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "dashboard/bulan/{bulan}/{tahun}/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "laporan/tanggal/{tanggal}/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "laporan/kodebooking/{kodebooking}"
  },
  {
    "verb": "get",
    "uri": "laporan/belum-dilayani/{kodepoli}"
  },
  {
    "verb": "get",
    "uri": "laporan/belum-dilayani/{kodepoli}/{kodedokter}/{tanggal}/{jampraktek}"
  },
  {
    "verb": "get",
    "uri": "token"
  },
  {
    "verb": "post",
    "uri": "antrean"
  },
  {
    "verb": "get",
    "uri": "antrean/{kodebooking}"
  },
  {
    "verb": "post",
    "uri": "antrean/{kodebooking}/batal"
  },
  {
    "verb": "post",
    "uri": "antrean/{kodebooking}/checkin"
  },
  {
    "verb": "post",
    "uri": "antrean/{kodebooking}/farmasi"
  },
  {
    "verb": "get",
    "uri": "antrean/{kodebooking}/farmasi"
  },
  {
    "verb": "post",
    "uri": "pasien-baru"
  },
  {
    "verb": "get",
    "uri": "jadwal-operasi"
  },
  {
    "verb": "get",
    "uri": "jadwal-operasi/{norm}"
  }
] as const

export function BpjsAntreanFktpListPage() {
  return <ApiConsole moduleName="BpjsAntreanFktp" routes={[...ROUTES]} />
}
