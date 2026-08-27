import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbMonth2Microscopy } from './types'

export const GeneralSitbMonth2MicroscopyEndpoint = '/sitb-month2-microscopies'

export function useSitbMonth2MicroscopyResource() {
  return useCrudResource<SitbMonth2Microscopy>(GeneralSitbMonth2MicroscopyEndpoint)
}
