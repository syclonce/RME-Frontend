import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Shipment } from './types'

export const InventoryShipmentEndpoint = '/shipments'

export function useShipmentResource() {
  return useCrudResource<Shipment>(InventoryShipmentEndpoint)
}
