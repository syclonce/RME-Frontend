import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "klaims"
  },
  {
    "verb": "get",
    "uri": "klaims/{klaim}"
  }
] as const

export function BpjsRekamMedisListPage() {
  return <ApiConsole moduleName="BpjsRekamMedis" routes={[...ROUTES]} />
}
