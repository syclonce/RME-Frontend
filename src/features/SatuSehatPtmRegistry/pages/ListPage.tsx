import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "skrining-ptm/bundle"
  },
  {
    "verb": "post",
    "uri": "kanker/bundle"
  },
  {
    "verb": "post",
    "uri": "jantung/bundle"
  },
  {
    "verb": "post",
    "uri": "stroke/bundle"
  },
  {
    "verb": "post",
    "uri": "uronefrologi/bundle"
  }
] as const

export function SatuSehatPtmRegistryListPage() {
  return <ApiConsole moduleName="SatuSehatPtmRegistry" routes={[...ROUTES]} />
}
