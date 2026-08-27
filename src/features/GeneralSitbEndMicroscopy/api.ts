import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbEndMicroscopy } from './types'

export const GeneralSitbEndMicroscopyEndpoint = '/sitb-end-microscopies'

export function useSitbEndMicroscopyResource() {
  return useCrudResource<SitbEndMicroscopy>(GeneralSitbEndMicroscopyEndpoint)
}
