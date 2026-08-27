import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MmpiTest } from './types'

export const MedicalRecordMmpiTestEndpoint = '/mmpi-tests'

export function useMmpiTestResource() {
  return useCrudResource<MmpiTest>(MedicalRecordMmpiTestEndpoint)
}
