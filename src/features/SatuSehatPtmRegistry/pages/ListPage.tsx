import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "satusehat/ptm-registry/skrining-ptm/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ptm-registry/kanker/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ptm-registry/jantung/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ptm-registry/stroke/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ptm-registry/uronefrologi/bundle"
  }
] as const

export function SatuSehatPtmRegistryListPage() {
  return <ApiConsole moduleName="SatuSehatPtmRegistry" routes={[...ROUTES]} />
}
