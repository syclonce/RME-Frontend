import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ImagingOrder } from './types'

export const LayananImagingOrderEndpoint = '/imaging-orders'

export function useImagingOrderResource() {
  return useCrudResource<ImagingOrder>(LayananImagingOrderEndpoint)
}
