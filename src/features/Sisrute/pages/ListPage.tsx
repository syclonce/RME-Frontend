import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "sisrute/rujukan"
  },
  {
    "verb": "get",
    "uri": "sisrute/rujukan/{rujukan}"
  },
  {
    "verb": "post",
    "uri": "sisrute/rujukan"
  },
  {
    "verb": "post",
    "uri": "sisrute/rujukan/notif"
  },
  {
    "verb": "post",
    "uri": "sisrute/rujukan/jawab"
  },
  {
    "verb": "post",
    "uri": "sisrute/rujukan/batal"
  },
  {
    "verb": "post",
    "uri": "sisrute/rujukan/images"
  },
  {
    "verb": "get",
    "uri": "sisrute/rujukan-pasien/{noRujukan}"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/faskes"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/alasan-rujukan"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/diagnosa"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/jenis-pelayanan"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/keadaan-keluar"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/cara-keluar"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/filter-faskes-kriteria"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/kriteria-khusus"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/kriteria-rujukan"
  },
  {
    "verb": "get",
    "uri": "sisrute/referensi/kriteria-matneo"
  }
] as const

export function SisruteListPage() {
  return <ApiConsole moduleName="Sisrute" routes={[...ROUTES]} />
}
