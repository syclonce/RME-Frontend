import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "sisrute-resume-medis/resume"
  },
  {
    "verb": "post",
    "uri": "sisrute-resume-medis/resume"
  }
] as const

export function SisruteResumeMedisListPage() {
  return <ApiConsole moduleName="SisruteResumeMedis" routes={[...ROUTES]} />
}
