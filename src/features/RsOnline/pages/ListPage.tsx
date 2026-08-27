import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "rs-online"
  },
  {
    "verb": "get",
    "uri": "rs-online/{rsOnlineSubmission}"
  },
  {
    "verb": "post",
    "uri": "rs-online/data/sdm"
  },
  {
    "verb": "post",
    "uri": "rs-online/data/layanan"
  },
  {
    "verb": "post",
    "uri": "rs-online/data/alkes"
  },
  {
    "verb": "post",
    "uri": "rs-online/data/tempat-tidur"
  },
  {
    "verb": "post",
    "uri": "rs-online/registrasi-user"
  },
  {
    "verb": "put",
    "uri": "rs-online/registrasi-user/{id}"
  },
  {
    "verb": "delete",
    "uri": "rs-online/registrasi-user/{id}"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/sdm"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/sarana"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/ruang-perawatan"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/pelayanan"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/kelas"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/kategori-sdm"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/kategori-layanan"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/instalasi"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/alkes"
  },
  {
    "verb": "get",
    "uri": "rs-online/referensi/faskes"
  }
] as const

export function RsOnlineListPage() {
  return <ApiConsole moduleName="RsOnline" routes={[...ROUTES]} />
}
