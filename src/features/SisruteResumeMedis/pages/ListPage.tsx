import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "resume"
  },
  {
    "verb": "post",
    "uri": "resume"
  }
] as const

export function SisruteResumeMedisListPage() {
  return <ApiConsole moduleName="SisruteResumeMedis" routes={[...ROUTES]} />
}
