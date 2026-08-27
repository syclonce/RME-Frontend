import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "eklaim/calls"
  },
  {
    "verb": "get",
    "uri": "eklaim/calls/{eklaimCall}"
  },
  {
    "verb": "post",
    "uri": "eklaim/calls"
  }
] as const

export function EKlaimListPage() {
  return <ApiConsole moduleName="EKlaim" routes={[...ROUTES]} />
}
