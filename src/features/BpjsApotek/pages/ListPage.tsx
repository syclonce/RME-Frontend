import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "apotek/resep"
  },
  {
    "verb": "get",
    "uri": "apotek/resep/{id}"
  },
  {
    "verb": "post",
    "uri": "apotek/resep"
  },
  {
    "verb": "delete",
    "uri": "apotek/resep/{id}"
  },
  {
    "verb": "get",
    "uri": "apotek/referensi/dpho/{query?}"
  },
  {
    "verb": "get",
    "uri": "apotek/referensi/poli/{query?}"
  },
  {
    "verb": "get",
    "uri": "apotek/referensi/faskes/{query?}"
  },
  {
    "verb": "get",
    "uri": "apotek/referensi/setting-apotek"
  },
  {
    "verb": "get",
    "uri": "apotek/referensi/spesialistik/{query?}"
  },
  {
    "verb": "get",
    "uri": "apotek/referensi/obat/{query?}"
  },
  {
    "verb": "get",
    "uri": "apotek/pelayanan-obat"
  },
  {
    "verb": "delete",
    "uri": "apotek/pelayanan-obat/{apotek_pelayanan_obat}"
  },
  {
    "verb": "get",
    "uri": "apotek/pelayanan-obat-riwayat/{no_sep}"
  },
  {
    "verb": "post",
    "uri": "apotek/penyimpanan-obat"
  },
  {
    "verb": "get",
    "uri": "apotek/penyimpanan-obat/{apotek_penyimpanan_obat}"
  },
  {
    "verb": "post",
    "uri": "apotek/penyimpanan-obat-stok"
  },
  {
    "verb": "get",
    "uri": "apotek/sep/{query}"
  },
  {
    "verb": "get",
    "uri": "apotek/monitoring"
  },
  {
    "verb": "get",
    "uri": "apotek/prb"
  }
] as const

export function BpjsApotekListPage() {
  return <ApiConsole moduleName="BpjsApotek" routes={[...ROUTES]} />
}
