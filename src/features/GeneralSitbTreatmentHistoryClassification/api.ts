import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbTreatmentHistoryClassification } from './types'

export const GeneralSitbTreatmentHistoryClassificationEndpoint = '/sitb-treatment-history-classifications'

export function useSitbTreatmentHistoryClassificationResource() {
  return useCrudResource<SitbTreatmentHistoryClassification>(GeneralSitbTreatmentHistoryClassificationEndpoint)
}
