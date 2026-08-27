import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { IcdOMorphology } from './types'

export const GeneralIcdOMorphologyEndpoint = '/icd-o-morphologies'

export function useIcdOMorphologyResource() {
  return useCrudResource<IcdOMorphology>(GeneralIcdOMorphologyEndpoint)
}
