import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbChildTbScore5 } from './types'

export const GeneralSitbChildTbScore5Endpoint = '/sitb-child-tb-score5s'

export function useSitbChildTbScore5Resource() {
  return useCrudResource<SitbChildTbScore5>(GeneralSitbChildTbScore5Endpoint)
}
