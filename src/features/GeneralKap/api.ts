import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Kap } from './types'

export const GeneralKapEndpoint = '/kaps'

export function useKapResource() {
  return useCrudResource<Kap>(GeneralKapEndpoint)
}
