import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Icd9CmCode } from './types'

export const MedicalRecordIcd9CmCodeEndpoint = '/icd9-cm-codes'

export function useIcd9CmCodeResource() {
  return useCrudResource<Icd9CmCode>(MedicalRecordIcd9CmCodeEndpoint)
}
