import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "kemkes-reports/bed-occupancy"
  },
  {
    "verb": "get",
    "uri": "kemkes-reports/inpatient-indicators"
  },
  {
    "verb": "get",
    "uri": "kemkes-reports/inpatient-visits-by-class"
  }
] as const

export function KemkesReportListPage() {
  return <ApiConsole moduleName="KemkesReport" routes={[...ROUTES]} />
}
