import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbTb03RoTransfer } from './types'

export const GeneralSitbTb03RoTransferEndpoint = '/sitb-tb03-ro-transfers'

export function useSitbTb03RoTransferResource() {
  return useCrudResource<SitbTb03RoTransfer>(GeneralSitbTb03RoTransferEndpoint)
}
