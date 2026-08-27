import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "resep"
  },
  {
    "verb": "get",
    "uri": "resep/{id}"
  },
  {
    "verb": "post",
    "uri": "resep"
  },
  {
    "verb": "delete",
    "uri": "resep/{id}"
  },
  {
    "verb": "get",
    "uri": "dpho/{query?}"
  },
  {
    "verb": "get",
    "uri": "poli/{query?}"
  },
  {
    "verb": "get",
    "uri": "faskes/{query?}"
  },
  {
    "verb": "get",
    "uri": "setting-apotek"
  },
  {
    "verb": "get",
    "uri": "spesialistik/{query?}"
  },
  {
    "verb": "get",
    "uri": "obat/{query?}"
  },
  {
    "verb": "get",
    "uri": "pelayanan-obat"
  },
  {
    "verb": "delete",
    "uri": "pelayanan-obat/{apotek_pelayanan_obat}"
  },
  {
    "verb": "get",
    "uri": "pelayanan-obat-riwayat/{no_sep}"
  },
  {
    "verb": "post",
    "uri": "penyimpanan-obat"
  },
  {
    "verb": "get",
    "uri": "penyimpanan-obat/{apotek_penyimpanan_obat}"
  },
  {
    "verb": "post",
    "uri": "penyimpanan-obat-stok"
  },
  {
    "verb": "get",
    "uri": "sep/{query}"
  },
  {
    "verb": "get",
    "uri": "monitoring"
  },
  {
    "verb": "get",
    "uri": "prb"
  }
] as const

export function BpjsApotekListPage() {
  return <ApiConsole moduleName="BpjsApotek" routes={[...ROUTES]} />
}
