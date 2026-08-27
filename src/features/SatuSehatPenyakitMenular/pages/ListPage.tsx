import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "satu-sehat-penyakit-menular"
  },
  {
    "verb": "get",
    "uri": "satu-sehat-penyakit-menular/{penyakitMenularSubmission}"
  },
  {
    "verb": "post",
    "uri": "satu-sehat-penyakit-menular/{useCase}"
  }
] as const

export function SatuSehatPenyakitMenularListPage() {
  return <ApiConsole moduleName="SatuSehatPenyakitMenular" routes={[...ROUTES]} />
}
