import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": ""
  },
  {
    "verb": "get",
    "uri": "{penyakitMenularSubmission}"
  },
  {
    "verb": "post",
    "uri": "{useCase}"
  }
] as const

export function SatuSehatPenyakitMenularListPage() {
  return <ApiConsole moduleName="SatuSehatPenyakitMenular" routes={[...ROUTES]} />
}
