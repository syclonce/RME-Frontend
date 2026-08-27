import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Nurse } from './types'

export const GeneralNurseEndpoint = '/nurses'

export function useNurseResource() {
  return useCrudResource<Nurse>(GeneralNurseEndpoint)
}
