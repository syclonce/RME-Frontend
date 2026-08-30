import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ImagingOrder, ImagingStudy } from './types'

export const LayananImagingOrderEndpoint = '/imaging-orders'
export const ImagingStudyEndpoint = '/imaging-studies'

export function useImagingOrderResource() {
  return useCrudResource<ImagingOrder>(LayananImagingOrderEndpoint)
}

export function useImagingStudyResource() {
  return useCrudResource<ImagingStudy>(ImagingStudyEndpoint)
}
