import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbChildTbScore6 } from './types'

export const GeneralSitbChildTbScore6Endpoint = '/sitb-child-tb-score6s'

export function useSitbChildTbScore6Resource() {
  return useCrudResource<SitbChildTbScore6>(GeneralSitbChildTbScore6Endpoint)
}
