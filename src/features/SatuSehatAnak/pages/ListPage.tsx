import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "satusehat/anak/mtbs/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/anak/imunisasi/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/anak/gizi/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/anak/tumbuh-kembang/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/anak/pkpr/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/anak/imunisasi-covid19/bundle"
  }
] as const

export function SatuSehatAnakListPage() {
  return <ApiConsole moduleName="SatuSehatAnak" routes={[...ROUTES]} />
}
