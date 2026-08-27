import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Icd10CauseOfDeathCode } from './types'

export const MedicalRecordIcd10CauseOfDeathCodeEndpoint = '/icd10-cause-of-death-codes'

export function useIcd10CauseOfDeathCodeResource() {
  return useCrudResource<Icd10CauseOfDeathCode>(MedicalRecordIcd10CauseOfDeathCodeEndpoint)
}
