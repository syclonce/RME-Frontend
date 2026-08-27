import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbChildTbScore0To13 } from './types'

export const GeneralSitbChildTbScore0To13Endpoint = '/sitb-child-tb-score0-to13s'

export function useSitbChildTbScore0To13Resource() {
  return useCrudResource<SitbChildTbScore0To13>(GeneralSitbChildTbScore0To13Endpoint)
}
