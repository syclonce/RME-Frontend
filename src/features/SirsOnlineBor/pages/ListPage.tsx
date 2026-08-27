import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "tempat-tidur"
  },
  {
    "verb": "post",
    "uri": "tempat-tidur"
  },
  {
    "verb": "get",
    "uri": "tempat-tidur/{tempatTidur}"
  },
  {
    "verb": "put",
    "uri": "tempat-tidur/{tempatTidur}"
  },
  {
    "verb": "delete",
    "uri": "tempat-tidur/{tempatTidur}"
  }
] as const

export function SirsOnlineBorListPage() {
  return <ApiConsole moduleName="SirsOnlineBor" routes={[...ROUTES]} />
}
