import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "satu-sehat-spesialistik"
  },
  {
    "verb": "get",
    "uri": "satu-sehat-spesialistik/{spesialistikSubmission}"
  },
  {
    "verb": "post",
    "uri": "satu-sehat-spesialistik/{useCase}"
  }
] as const

export function SatuSehatSpesialistikListPage() {
  return <ApiConsole moduleName="SatuSehatSpesialistik" routes={[...ROUTES]} />
}
