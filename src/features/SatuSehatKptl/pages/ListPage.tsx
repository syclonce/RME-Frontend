import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "code"
  },
  {
    "verb": "post",
    "uri": "base-code"
  },
  {
    "verb": "post",
    "uri": "base-code-combination"
  },
  {
    "verb": "post",
    "uri": "modifier"
  },
  {
    "verb": "post",
    "uri": "modifier-value"
  },
  {
    "verb": "post",
    "uri": "base-code-by-modifier"
  }
] as const

export function SatuSehatKptlListPage() {
  return <ApiConsole moduleName="SatuSehatKptl" routes={[...ROUTES]} />
}
