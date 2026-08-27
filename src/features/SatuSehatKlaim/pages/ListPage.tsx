import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": ""
  },
  {
    "verb": "get",
    "uri": "{klaimSubmission}"
  },
  {
    "verb": "post",
    "uri": "{useCase}"
  }
] as const

export function SatuSehatKlaimListPage() {
  return <ApiConsole moduleName="SatuSehatKlaim" routes={[...ROUTES]} />
}
