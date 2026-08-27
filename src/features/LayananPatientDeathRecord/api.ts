import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientDeathRecord } from './types'

export const LayananPatientDeathRecordEndpoint = '/patient-death-records'

export function usePatientDeathRecordResource() {
  return useCrudResource<PatientDeathRecord>(LayananPatientDeathRecordEndpoint)
}
