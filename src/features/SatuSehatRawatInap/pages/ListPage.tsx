import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "encounters"
  }
] as const

export function SatuSehatRawatInapListPage() {
  return <ApiConsole moduleName="SatuSehatRawatInap" routes={[...ROUTES]} />
}
