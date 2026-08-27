import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbDm } from './types'

export const GeneralSitbDmEndpoint = '/sitb-dms'

export function useSitbDmResource() {
  return useCrudResource<SitbDm>(GeneralSitbDmEndpoint)
}
