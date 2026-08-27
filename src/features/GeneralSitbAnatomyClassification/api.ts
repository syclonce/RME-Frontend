import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbAnatomyClassification } from './types'

export const GeneralSitbAnatomyClassificationEndpoint = '/sitb-anatomy-classifications'

export function useSitbAnatomyClassificationResource() {
  return useCrudResource<SitbAnatomyClassification>(GeneralSitbAnatomyClassificationEndpoint)
}
