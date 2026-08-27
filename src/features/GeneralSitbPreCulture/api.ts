import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbPreCulture } from './types'

export const GeneralSitbPreCultureEndpoint = '/sitb-pre-cultures'

export function useSitbPreCultureResource() {
  return useCrudResource<SitbPreCulture>(GeneralSitbPreCultureEndpoint)
}
