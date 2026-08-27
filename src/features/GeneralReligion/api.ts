import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Religion } from './types'

export const GeneralReligionEndpoint = '/religions'

export function useReligionResource() {
  return useCrudResource<Religion>(GeneralReligionEndpoint)
}
