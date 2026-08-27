import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientDischargeRecord } from './types'

export const LayananPatientDischargeRecordEndpoint = '/patient-discharge-records'

export function usePatientDischargeRecordResource() {
  return useCrudResource<PatientDischargeRecord>(LayananPatientDischargeRecordEndpoint)
}
