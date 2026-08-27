import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FibroscanResult } from './types'

export const MedicalRecordFibroscanResultEndpoint = '/fibroscan-results'

export function useFibroscanResultResource() {
  return useCrudResource<FibroscanResult>(MedicalRecordFibroscanResultEndpoint)
}
