import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbChestXrayResult } from './types'

export const GeneralSitbChestXrayResultEndpoint = '/sitb-chest-xray-results'

export function useSitbChestXrayResultResource() {
  return useCrudResource<SitbChestXrayResult>(GeneralSitbChestXrayResultEndpoint)
}
