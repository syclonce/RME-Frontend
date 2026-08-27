import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbThoraxNotDone } from './types'

export const GeneralSitbThoraxNotDoneEndpoint = '/sitb-thorax-not-dones'

export function useSitbThoraxNotDoneResource() {
  return useCrudResource<SitbThoraxNotDone>(GeneralSitbThoraxNotDoneEndpoint)
}
