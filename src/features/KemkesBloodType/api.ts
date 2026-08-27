import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BloodType } from './types'

export const KemkesBloodTypeEndpoint = '/blood_types'

export function useBloodTypeResource() {
  return useCrudResource<BloodType>(KemkesBloodTypeEndpoint)
}
