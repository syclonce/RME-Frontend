import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "medication-requests"
  }
] as const

export function SatuSehatFarmasiListPage() {
  return <ApiConsole moduleName="SatuSehatFarmasi" routes={[...ROUTES]} />
}
