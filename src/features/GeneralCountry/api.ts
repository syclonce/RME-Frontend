import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Country } from './types'

export const GeneralCountryEndpoint = '/countries'

export function useCountryResource() {
  return useCrudResource<Country>(GeneralCountryEndpoint)
}
