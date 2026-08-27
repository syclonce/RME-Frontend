import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AdmissionMedicationReconciliation } from './types'

export const MedicalRecordAdmissionMedicationReconciliationEndpoint = '/admission-med-reconciliations'

export function useAdmissionMedicationReconciliationResource() {
  return useCrudResource<AdmissionMedicationReconciliation>(MedicalRecordAdmissionMedicationReconciliationEndpoint)
}
