import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Gender } from './types'

export const GeneralGenderEndpoint = '/genders'

export function useGenderResource() {
  return useCrudResource<Gender>(GeneralGenderEndpoint)
}
