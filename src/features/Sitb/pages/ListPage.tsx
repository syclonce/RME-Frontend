import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "pasien-tb"
  },
  {
    "verb": "post",
    "uri": "pasien-tb"
  },
  {
    "verb": "get",
    "uri": "pasien-tb/{pasienTb}"
  },
  {
    "verb": "put",
    "uri": "pasien-tb/{pasienTb}"
  }
] as const

export function SitbListPage() {
  return <ApiConsole moduleName="Sitb" routes={[...ROUTES]} />
}
