import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "encounters"
  },
  {
    "verb": "post",
    "uri": "triage-observations"
  }
] as const

export function SatuSehatIgdListPage() {
  return <ApiConsole moduleName="SatuSehatIgd" routes={[...ROUTES]} />
}
