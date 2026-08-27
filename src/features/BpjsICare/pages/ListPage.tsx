import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "riwayat-pelayanan/validate"
  }
] as const

export function BpjsICareListPage() {
  return <ApiConsole moduleName="BpjsICare" routes={[...ROUTES]} />
}
