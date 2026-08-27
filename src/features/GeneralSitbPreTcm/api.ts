import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbPreTcm } from './types'

export const GeneralSitbPreTcmEndpoint = '/sitb-pre-tcms'

export function useSitbPreTcmResource() {
  return useCrudResource<SitbPreTcm>(GeneralSitbPreTcmEndpoint)
}
