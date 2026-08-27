import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ImageMarker } from './types'

export const MedicalRecordImageMarkerEndpoint = '/image-markers'

export function useImageMarkerResource() {
  return useCrudResource<ImageMarker>(MedicalRecordImageMarkerEndpoint)
}
