import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "satusehat/kptl/code"
  },
  {
    "verb": "post",
    "uri": "satusehat/kptl/base-code"
  },
  {
    "verb": "post",
    "uri": "satusehat/kptl/base-code-combination"
  },
  {
    "verb": "post",
    "uri": "satusehat/kptl/modifier"
  },
  {
    "verb": "post",
    "uri": "satusehat/kptl/modifier-value"
  },
  {
    "verb": "post",
    "uri": "satusehat/kptl/base-code-by-modifier"
  }
] as const

export function SatuSehatKptlListPage() {
  return <ApiConsole moduleName="SatuSehatKptl" routes={[...ROUTES]} />
}
