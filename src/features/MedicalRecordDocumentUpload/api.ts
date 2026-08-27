import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DocumentUpload } from './types'

export const MedicalRecordDocumentUploadEndpoint = '/document-uploads'

export function useDocumentUploadResource() {
  return useCrudResource<DocumentUpload>(MedicalRecordDocumentUploadEndpoint)
}
