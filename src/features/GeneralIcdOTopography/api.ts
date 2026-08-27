import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { IcdOTopography } from './types'

export const GeneralIcdOTopographyEndpoint = '/icd-o-topographies'

export function useIcdOTopographyResource() {
  return useCrudResource<IcdOTopography>(GeneralIcdOTopographyEndpoint)
}
