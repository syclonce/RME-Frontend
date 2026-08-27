import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "calls"
  },
  {
    "verb": "get",
    "uri": "calls/{eklaimCall}"
  },
  {
    "verb": "post",
    "uri": "calls"
  }
] as const

export function EKlaimListPage() {
  return <ApiConsole moduleName="EKlaim" routes={[...ROUTES]} />
}
