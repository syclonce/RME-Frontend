import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbPpk } from './types'

export const GeneralSitbPpkEndpoint = '/sitb-ppks'

export function useSitbPpkResource() {
  return useCrudResource<SitbPpk>(GeneralSitbPpkEndpoint)
}
