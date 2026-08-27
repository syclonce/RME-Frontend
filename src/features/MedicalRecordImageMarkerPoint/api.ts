import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ImageMarkerPoint } from './types'

export const MedicalRecordImageMarkerPointEndpoint = '/image-marker-points'

export function useImageMarkerPointResource() {
  return useCrudResource<ImageMarkerPoint>(MedicalRecordImageMarkerPointEndpoint)
}
