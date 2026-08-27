import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbPreMicroscopy } from './types'

export const GeneralSitbPreMicroscopyEndpoint = '/sitb-pre-microscopies'

export function useSitbPreMicroscopyResource() {
  return useCrudResource<SitbPreMicroscopy>(GeneralSitbPreMicroscopyEndpoint)
}
