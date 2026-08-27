import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbMonth5Microscopy } from './types'

export const GeneralSitbMonth5MicroscopyEndpoint = '/sitb-month5-microscopies'

export function useSitbMonth5MicroscopyResource() {
  return useCrudResource<SitbMonth5Microscopy>(GeneralSitbMonth5MicroscopyEndpoint)
}
