import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TransferMedicationReconciliationItem } from './types'

export const MedicalRecordTransferMedicationReconciliationItemEndpoint = '/transfer-med-reconciliation-items'

export function useTransferMedicationReconciliationItemResource() {
  return useCrudResource<TransferMedicationReconciliationItem>(MedicalRecordTransferMedicationReconciliationItemEndpoint)
}
