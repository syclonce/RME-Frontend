import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "satusehat/rawat-inap/encounters"
  }
] as const

export function SatuSehatRawatInapListPage() {
  return <ApiConsole moduleName="SatuSehatRawatInap" routes={[...ROUTES]} />
}
