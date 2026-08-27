import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Education } from './types'

export const GeneralEducationEndpoint = '/educations'

export function useEducationResource() {
  return useCrudResource<Education>(GeneralEducationEndpoint)
}
