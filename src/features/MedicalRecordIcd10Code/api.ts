import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Icd10Code } from './types'

export const MedicalRecordIcd10CodeEndpoint = '/icd10-codes'

export function useIcd10CodeResource() {
  return useCrudResource<Icd10Code>(MedicalRecordIcd10CodeEndpoint)
}
