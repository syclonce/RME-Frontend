import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbDrugSource } from './types'

export const GeneralSitbDrugSourceEndpoint = '/sitb-drug-sources'

export function useSitbDrugSourceResource() {
  return useCrudResource<SitbDrugSource>(GeneralSitbDrugSourceEndpoint)
}
