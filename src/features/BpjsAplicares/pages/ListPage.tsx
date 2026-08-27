import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "referensi/kamar/{query?}"
  },
  {
    "verb": "get",
    "uri": "rooms"
  },
  {
    "verb": "post",
    "uri": "rooms"
  },
  {
    "verb": "get",
    "uri": "rooms/{aplicares_room_sync}"
  },
  {
    "verb": "delete",
    "uri": "rooms/{aplicares_room_sync}"
  },
  {
    "verb": "post",
    "uri": "rooms/{aplicares_room_sync}/beds"
  }
] as const

export function BpjsAplicaresListPage() {
  return <ApiConsole moduleName="BpjsAplicares" routes={[...ROUTES]} />
}
