import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralScannedDocument } from './types'

export const GeneralScannedDocumentEndpoint = '/scanned-documents'

export function useGeneralScannedDocumentResource() {
  return useCrudResource<GeneralScannedDocument>(GeneralScannedDocumentEndpoint)
}
