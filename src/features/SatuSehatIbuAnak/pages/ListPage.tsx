import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "anc/bundle"
  },
  {
    "verb": "post",
    "uri": "inc/bundle"
  },
  {
    "verb": "post",
    "uri": "pnc/bundle"
  },
  {
    "verb": "post",
    "uri": "neonatus/bundle"
  },
  {
    "verb": "post",
    "uri": "shk/bundle"
  },
  {
    "verb": "post",
    "uri": "kematian-maternal/bundle"
  },
  {
    "verb": "post",
    "uri": "data-kelahiran/bundle"
  }
] as const

export function SatuSehatIbuAnakListPage() {
  return <ApiConsole moduleName="SatuSehatIbuAnak" routes={[...ROUTES]} />
}
