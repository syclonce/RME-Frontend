import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TransferMedicationReconciliation } from './types'

export const MedicalRecordTransferMedicationReconciliationEndpoint = '/transfer-med-reconciliations'

export function useTransferMedicationReconciliationResource() {
  return useCrudResource<TransferMedicationReconciliation>(MedicalRecordTransferMedicationReconciliationEndpoint)
}
