import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbTreatmentStatus } from './types'

export const GeneralSitbTreatmentStatusEndpoint = '/sitb-treatment-statuses'

export function useSitbTreatmentStatusResource() {
  return useCrudResource<SitbTreatmentStatus>(GeneralSitbTreatmentStatusEndpoint)
}
