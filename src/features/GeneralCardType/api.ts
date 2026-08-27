import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { CardType } from './types'

export const GeneralCardTypeEndpoint = '/card-types'

export function useCardTypeResource() {
  return useCrudResource<CardType>(GeneralCardTypeEndpoint)
}
