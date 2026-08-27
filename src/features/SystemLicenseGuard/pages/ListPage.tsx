import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "status"
  },
  {
    "verb": "get",
    "uri": "fingerprint"
  },
  {
    "verb": "post",
    "uri": "activate"
  },
  {
    "verb": "post",
    "uri": "sync"
  },
  {
    "verb": "post",
    "uri": "webhook"
  }
] as const

export function SystemLicenseGuardListPage() {
  return <ApiConsole moduleName="SystemLicenseGuard" routes={[...ROUTES]} />
}
