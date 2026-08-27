import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "system/license/status"
  },
  {
    "verb": "get",
    "uri": "system/license/fingerprint"
  },
  {
    "verb": "post",
    "uri": "system/license/activate"
  },
  {
    "verb": "post",
    "uri": "system/license/sync"
  },
  {
    "verb": "post",
    "uri": "system/license/webhook"
  }
] as const

export function SystemLicenseGuardListPage() {
  return <ApiConsole moduleName="SystemLicenseGuard" routes={[...ROUTES]} />
}
