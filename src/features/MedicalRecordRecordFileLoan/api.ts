import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RecordFileLoan } from './types'

export const MedicalRecordRecordFileLoanEndpoint = '/record-file-loans'

export function useRecordFileLoanResource() {
  return useCrudResource<RecordFileLoan>(MedicalRecordRecordFileLoanEndpoint)
}
