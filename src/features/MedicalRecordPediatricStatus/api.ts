import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PediatricStatus } from './types'

export const MedicalRecordPediatricStatusEndpoint = '/pediatric-statuses'

export function usePediatricStatusResource() {
  return useCrudResource<PediatricStatus>(MedicalRecordPediatricStatusEndpoint)
}
