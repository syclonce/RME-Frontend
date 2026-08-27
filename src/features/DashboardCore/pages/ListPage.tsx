import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "dashboard/core"
  }
] as const

export function DashboardCoreListPage() {
  return <ApiConsole moduleName="DashboardCore" routes={[...ROUTES]} />
}
