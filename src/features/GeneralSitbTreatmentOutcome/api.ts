import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbTreatmentOutcome } from './types'

export const GeneralSitbTreatmentOutcomeEndpoint = '/sitb-treatment-outcomes'

export function useSitbTreatmentOutcomeResource() {
  return useCrudResource<SitbTreatmentOutcome>(GeneralSitbTreatmentOutcomeEndpoint)
}
