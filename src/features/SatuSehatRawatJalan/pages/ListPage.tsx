import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "satusehat/rawat-jalan/encounters"
  }
] as const

export function SatuSehatRawatJalanListPage() {
  return <ApiConsole moduleName="SatuSehatRawatJalan" routes={[...ROUTES]} />
}
