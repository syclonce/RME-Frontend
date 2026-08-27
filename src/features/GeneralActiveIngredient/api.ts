import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ActiveIngredient } from './types'

export const GeneralActiveIngredientEndpoint = '/active-ingredients'

export function useActiveIngredientResource() {
  return useCrudResource<ActiveIngredient>(GeneralActiveIngredientEndpoint)
}
