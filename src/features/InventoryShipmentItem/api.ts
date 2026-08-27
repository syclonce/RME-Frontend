import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ShipmentItem } from './types'

export const InventoryShipmentItemEndpoint = '/shipment-items'

export function useShipmentItemResource() {
  return useCrudResource<ShipmentItem>(InventoryShipmentItemEndpoint)
}
