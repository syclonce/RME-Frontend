import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Ppk } from './types'

export const GeneralPpkEndpoint = '/ppks'

export function usePpkResource() {
  return useCrudResource<Ppk>(GeneralPpkEndpoint)
}
