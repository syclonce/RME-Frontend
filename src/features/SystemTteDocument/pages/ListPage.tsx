import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "tte-documents"
  },
  {
    "verb": "get",
    "uri": "tte-documents/{tteDocument}"
  },
  {
    "verb": "post",
    "uri": "tte-documents"
  },
  {
    "verb": "post",
    "uri": "tte-documents/{tteDocument}/submit-for-sign"
  },
  {
    "verb": "post",
    "uri": "tte-documents/{tteDocument}/sign"
  },
  {
    "verb": "post",
    "uri": "tte-documents/{tteDocument}/lock"
  }
] as const

export function SystemTteDocumentListPage() {
  return <ApiConsole moduleName="SystemTteDocument" routes={[...ROUTES]} />
}
