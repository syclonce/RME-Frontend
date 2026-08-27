import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DischargeMedicationReconciliationItem } from './types'

export const MedicalRecordDischargeMedicationReconciliationItemEndpoint = '/discharge-med-reconciliation-items'

export function useDischargeMedicationReconciliationItemResource() {
  return useCrudResource<DischargeMedicationReconciliationItem>(MedicalRecordDischargeMedicationReconciliationItemEndpoint)
}
