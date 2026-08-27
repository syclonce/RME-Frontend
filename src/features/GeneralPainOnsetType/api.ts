import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PainOnsetType } from './types'

export const GeneralPainOnsetTypeEndpoint = '/pain-onset-types'

export function usePainOnsetTypeResource() {
  return useCrudResource<PainOnsetType>(GeneralPainOnsetTypeEndpoint)
}
