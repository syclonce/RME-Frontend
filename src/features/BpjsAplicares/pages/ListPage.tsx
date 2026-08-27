import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "aplicares/referensi/kamar/{query?}"
  },
  {
    "verb": "get",
    "uri": "aplicares/rooms"
  },
  {
    "verb": "post",
    "uri": "aplicares/rooms"
  },
  {
    "verb": "get",
    "uri": "aplicares/rooms/{aplicares_room_sync}"
  },
  {
    "verb": "delete",
    "uri": "aplicares/rooms/{aplicares_room_sync}"
  },
  {
    "verb": "post",
    "uri": "aplicares/rooms/{aplicares_room_sync}/beds"
  }
] as const

export function BpjsAplicaresListPage() {
  return <ApiConsole moduleName="BpjsAplicares" routes={[...ROUTES]} />
}
