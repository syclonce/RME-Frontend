import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientTransferSheet } from './types'

export const MedicalRecordPatientTransferSheetEndpoint = '/patient-transfer-sheets'

export function usePatientTransferSheetResource() {
  return useCrudResource<PatientTransferSheet>(MedicalRecordPatientTransferSheetEndpoint)
}
