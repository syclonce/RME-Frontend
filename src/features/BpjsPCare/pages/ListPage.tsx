import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "kunjungans"
  },
  {
    "verb": "get",
    "uri": "kunjungans/{id}"
  },
  {
    "verb": "post",
    "uri": "kunjungans"
  },
  {
    "verb": "put",
    "uri": "kunjungans/{id}"
  },
  {
    "verb": "delete",
    "uri": "kunjungans/{id}"
  },
  {
    "verb": "get",
    "uri": "pendaftarans"
  },
  {
    "verb": "get",
    "uri": "pendaftarans/{id}"
  },
  {
    "verb": "post",
    "uri": "pendaftarans"
  },
  {
    "verb": "delete",
    "uri": "pendaftarans/{id}"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/diagnosa"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/dokter"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/kelompok"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/kesadaran"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/obat"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/poli"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/provider"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/spesialis"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/status-pulang"
  },
  {
    "verb": "get",
    "uri": "pcare-ref/peserta"
  },
  {
    "verb": "get",
    "uri": "kunjungans/rujukan"
  },
  {
    "verb": "get",
    "uri": "kunjungans/riwayat"
  },
  {
    "verb": "get",
    "uri": "pendaftarans/nomor-urut"
  },
  {
    "verb": "get",
    "uri": "pendaftarans/provider"
  }
] as const

export function BpjsPCareListPage() {
  return <ApiConsole moduleName="BpjsPCare" routes={[...ROUTES]} />
}
