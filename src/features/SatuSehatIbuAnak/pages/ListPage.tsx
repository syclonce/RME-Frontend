import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "post",
    "uri": "satusehat/ibu-anak/anc/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ibu-anak/inc/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ibu-anak/pnc/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ibu-anak/neonatus/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ibu-anak/shk/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ibu-anak/kematian-maternal/bundle"
  },
  {
    "verb": "post",
    "uri": "satusehat/ibu-anak/data-kelahiran/bundle"
  }
] as const

export function SatuSehatIbuAnakListPage() {
  return <ApiConsole moduleName="SatuSehatIbuAnak" routes={[...ROUTES]} />
}
