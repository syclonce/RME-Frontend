import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "sitb/pasien-tb"
  },
  {
    "verb": "post",
    "uri": "sitb/pasien-tb"
  },
  {
    "verb": "get",
    "uri": "sitb/pasien-tb/{pasienTb}"
  },
  {
    "verb": "put",
    "uri": "sitb/pasien-tb/{pasienTb}"
  }
] as const

export function SitbListPage() {
  return <ApiConsole moduleName="Sitb" routes={[...ROUTES]} />
}
