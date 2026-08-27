import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbHivStatusClassification } from './types'

export const GeneralSitbHivStatusClassificationEndpoint = '/sitb-hiv-status-classifications'

export function useSitbHivStatusClassificationResource() {
  return useCrudResource<SitbHivStatusClassification>(GeneralSitbHivStatusClassificationEndpoint)
}
