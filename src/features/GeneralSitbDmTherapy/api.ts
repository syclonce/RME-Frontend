import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbDmTherapy } from './types'

export const GeneralSitbDmTherapyEndpoint = '/sitb-dm-therapies'

export function useSitbDmTherapyResource() {
  return useCrudResource<SitbDmTherapy>(GeneralSitbDmTherapyEndpoint)
}
