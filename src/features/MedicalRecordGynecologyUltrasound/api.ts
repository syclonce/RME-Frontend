import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GynecologyUltrasound } from './types'

export const MedicalRecordGynecologyUltrasoundEndpoint = '/gynecology-ultrasounds'

export function useGynecologyUltrasoundResource() {
  return useCrudResource<GynecologyUltrasound>(MedicalRecordGynecologyUltrasoundEndpoint)
}
