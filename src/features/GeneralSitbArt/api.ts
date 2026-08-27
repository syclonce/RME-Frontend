import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbArt } from './types'

export const GeneralSitbArtEndpoint = '/sitb-arts'

export function useSitbArtResource() {
  return useCrudResource<SitbArt>(GeneralSitbArtEndpoint)
}
