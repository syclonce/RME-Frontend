import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "encounters"
  }
] as const

export function SatuSehatRawatJalanListPage() {
  return <ApiConsole moduleName="SatuSehatRawatJalan" routes={[...ROUTES]} />
}
