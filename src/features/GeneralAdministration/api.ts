import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Administration } from './types'

export const GeneralAdministrationEndpoint = '/administrations'

export function useAdministrationResource() {
  return useCrudResource<Administration>(GeneralAdministrationEndpoint)
}
