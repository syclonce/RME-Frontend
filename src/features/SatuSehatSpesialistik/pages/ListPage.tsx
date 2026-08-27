import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": ""
  },
  {
    "verb": "get",
    "uri": "{spesialistikSubmission}"
  },
  {
    "verb": "post",
    "uri": "{useCase}"
  }
] as const

export function SatuSehatSpesialistikListPage() {
  return <ApiConsole moduleName="SatuSehatSpesialistik" routes={[...ROUTES]} />
}
