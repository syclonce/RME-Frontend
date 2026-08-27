import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { IdentityCardType } from './types'

export const GeneralIdentityCardTypeEndpoint = '/identity-card-types'

export function useIdentityCardTypeResource() {
  return useCrudResource<IdentityCardType>(GeneralIdentityCardTypeEndpoint)
}
