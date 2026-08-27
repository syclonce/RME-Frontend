import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "mtbs/bundle"
  },
  {
    "verb": "post",
    "uri": "imunisasi/bundle"
  },
  {
    "verb": "post",
    "uri": "gizi/bundle"
  },
  {
    "verb": "post",
    "uri": "tumbuh-kembang/bundle"
  },
  {
    "verb": "post",
    "uri": "pkpr/bundle"
  },
  {
    "verb": "post",
    "uri": "imunisasi-covid19/bundle"
  }
] as const

export function SatuSehatAnakListPage() {
  return <ApiConsole moduleName="SatuSehatAnak" routes={[...ROUTES]} />
}
