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
    "uri": "diagnosa"
  },
  {
    "verb": "get",
    "uri": "dokter"
  },
  {
    "verb": "get",
    "uri": "kelompok"
  },
  {
    "verb": "get",
    "uri": "kesadaran"
  },
  {
    "verb": "get",
    "uri": "obat"
  },
  {
    "verb": "get",
    "uri": "poli"
  },
  {
    "verb": "get",
    "uri": "provider"
  },
  {
    "verb": "get",
    "uri": "spesialis"
  },
  {
    "verb": "get",
    "uri": "status-pulang"
  },
  {
    "verb": "get",
    "uri": "peserta"
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
