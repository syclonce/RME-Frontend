import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "self-checkin-queues"
  },
  {
    "verb": "post",
    "uri": "self-checkin-queues"
  },
  {
    "verb": "post",
    "uri": "self-checkin-queues/{queue}/call"
  },
  {
    "verb": "post",
    "uri": "self-checkin-queues/{queue}/complete"
  }
] as const

export function PendaftaranSelfCheckinListPage() {
  return <ApiConsole moduleName="PendaftaranSelfCheckin" routes={[...ROUTES]} />
}
