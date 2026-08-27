import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbMonth3Microscopy } from './types'

export const GeneralSitbMonth3MicroscopyEndpoint = '/sitb-month3-microscopies'

export function useSitbMonth3MicroscopyResource() {
  return useCrudResource<SitbMonth3Microscopy>(GeneralSitbMonth3MicroscopyEndpoint)
}
