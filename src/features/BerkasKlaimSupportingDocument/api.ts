import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BerkasKlaimSupportingDocument } from './types'

export const BerkasKlaimSupportingDocumentEndpoint = '/supporting-documents'

export function useBerkasKlaimSupportingDocumentResource() {
  return useCrudResource<BerkasKlaimSupportingDocument>(BerkasKlaimSupportingDocumentEndpoint)
}
