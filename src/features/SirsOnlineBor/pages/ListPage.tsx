import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "sirs-online-bor/tempat-tidur"
  },
  {
    "verb": "post",
    "uri": "sirs-online-bor/tempat-tidur"
  },
  {
    "verb": "get",
    "uri": "sirs-online-bor/tempat-tidur/{tempatTidur}"
  },
  {
    "verb": "put",
    "uri": "sirs-online-bor/tempat-tidur/{tempatTidur}"
  },
  {
    "verb": "delete",
    "uri": "sirs-online-bor/tempat-tidur/{tempatTidur}"
  }
] as const

export function SirsOnlineBorListPage() {
  return <ApiConsole moduleName="SirsOnlineBor" routes={[...ROUTES]} />
}
