import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EyeExamDocumentUpload } from './types'

export const MedicalRecordEyeExamDocumentUploadEndpoint = '/eye-exam-document-uploads'

export function useEyeExamDocumentUploadResource() {
  return useCrudResource<EyeExamDocumentUpload>(MedicalRecordEyeExamDocumentUploadEndpoint)
}
