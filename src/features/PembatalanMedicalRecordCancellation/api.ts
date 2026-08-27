import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PembatalanMedicalRecordCancellation } from './types'

export const PembatalanMedicalRecordCancellationEndpoint = '/medical-record-cancellations'

export function usePembatalanMedicalRecordCancellationResource() {
  return useCrudResource<PembatalanMedicalRecordCancellation>(PembatalanMedicalRecordCancellationEndpoint)
}
