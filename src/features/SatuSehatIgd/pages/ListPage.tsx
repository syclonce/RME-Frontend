import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "satusehat/igd/encounters"
  },
  {
    "verb": "post",
    "uri": "satusehat/igd/triage-observations"
  }
] as const

export function SatuSehatIgdListPage() {
  return <ApiConsole moduleName="SatuSehatIgd" routes={[...ROUTES]} />
}
