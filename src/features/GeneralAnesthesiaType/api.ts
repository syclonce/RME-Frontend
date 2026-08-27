import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AnesthesiaType } from './types'

export const GeneralAnesthesiaTypeEndpoint = '/anesthesia-types'

export function useAnesthesiaTypeResource() {
  return useCrudResource<AnesthesiaType>(GeneralAnesthesiaTypeEndpoint)
}
