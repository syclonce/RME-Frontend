import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Kip } from './types'

export const GeneralKipEndpoint = '/kips'

export function useKipResource() {
  return useCrudResource<Kip>(GeneralKipEndpoint)
}
