import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Profession } from './types'

export const GeneralProfessionEndpoint = '/professions'

export function useProfessionResource() {
  return useCrudResource<Profession>(GeneralProfessionEndpoint)
}
