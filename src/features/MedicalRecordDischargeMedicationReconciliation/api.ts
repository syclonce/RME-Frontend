import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DischargeMedicationReconciliation } from './types'

export const MedicalRecordDischargeMedicationReconciliationEndpoint = '/discharge-med-reconciliations'

export function useDischargeMedicationReconciliationResource() {
  return useCrudResource<DischargeMedicationReconciliation>(MedicalRecordDischargeMedicationReconciliationEndpoint)
}
