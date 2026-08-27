import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DoctorProcedureConsent } from './types'

export const MedicalRecordDoctorProcedureConsentEndpoint = '/doctor-procedure-consents'

export function useDoctorProcedureConsentResource() {
  return useCrudResource<DoctorProcedureConsent>(MedicalRecordDoctorProcedureConsentEndpoint)
}
