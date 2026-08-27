import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbOatGuideline } from './types'

export const GeneralSitbOatGuidelineEndpoint = '/sitb-oat-guidelines'

export function useSitbOatGuidelineResource() {
  return useCrudResource<SitbOatGuideline>(GeneralSitbOatGuidelineEndpoint)
}
