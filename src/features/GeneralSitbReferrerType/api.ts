import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbReferrerType } from './types'

export const GeneralSitbReferrerTypeEndpoint = '/sitb-referrer-types'

export function useSitbReferrerTypeResource() {
  return useCrudResource<SitbReferrerType>(GeneralSitbReferrerTypeEndpoint)
}
