import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "satu-sehat-klaim"
  },
  {
    "verb": "get",
    "uri": "satu-sehat-klaim/{klaimSubmission}"
  },
  {
    "verb": "post",
    "uri": "satu-sehat-klaim/{useCase}"
  }
] as const

export function SatuSehatKlaimListPage() {
  return <ApiConsole moduleName="SatuSehatKlaim" routes={[...ROUTES]} />
}
