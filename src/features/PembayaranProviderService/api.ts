import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ProviderService } from './types'

export const PembayaranProviderServiceEndpoint = '/provider-services'

export function useProviderServiceResource() {
  return useCrudResource<ProviderService>(PembayaranProviderServiceEndpoint)
}
