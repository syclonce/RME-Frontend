import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": ""
  },
  {
    "verb": "get",
    "uri": "{rsOnlineSubmission}"
  },
  {
    "verb": "post",
    "uri": "data/sdm"
  },
  {
    "verb": "post",
    "uri": "data/layanan"
  },
  {
    "verb": "post",
    "uri": "data/alkes"
  },
  {
    "verb": "post",
    "uri": "data/tempat-tidur"
  },
  {
    "verb": "post",
    "uri": "registrasi-user"
  },
  {
    "verb": "put",
    "uri": "registrasi-user/{id}"
  },
  {
    "verb": "delete",
    "uri": "registrasi-user/{id}"
  },
  {
    "verb": "get",
    "uri": "referensi/sdm"
  },
  {
    "verb": "get",
    "uri": "referensi/sarana"
  },
  {
    "verb": "get",
    "uri": "referensi/ruang-perawatan"
  },
  {
    "verb": "get",
    "uri": "referensi/pelayanan"
  },
  {
    "verb": "get",
    "uri": "referensi/kelas"
  },
  {
    "verb": "get",
    "uri": "referensi/kategori-sdm"
  },
  {
    "verb": "get",
    "uri": "referensi/kategori-layanan"
  },
  {
    "verb": "get",
    "uri": "referensi/instalasi"
  },
  {
    "verb": "get",
    "uri": "referensi/alkes"
  },
  {
    "verb": "get",
    "uri": "referensi/faskes"
  }
] as const

export function RsOnlineListPage() {
  return <ApiConsole moduleName="RsOnline" routes={[...ROUTES]} />
}
