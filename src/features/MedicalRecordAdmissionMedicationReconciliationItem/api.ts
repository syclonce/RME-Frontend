import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AdmissionMedicationReconciliationItem } from './types'

export const MedicalRecordAdmissionMedicationReconciliationItemEndpoint = '/admission-med-reconciliation-items'

export function useAdmissionMedicationReconciliationItemResource() {
  return useCrudResource<AdmissionMedicationReconciliationItem>(MedicalRecordAdmissionMedicationReconciliationItemEndpoint)
}
