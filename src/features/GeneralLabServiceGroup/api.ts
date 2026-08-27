import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabServiceGroup } from './types'

export const GeneralLabServiceGroupEndpoint = '/lab-service-groups'

export function useLabServiceGroupResource() {
  return useCrudResource<LabServiceGroup>(GeneralLabServiceGroupEndpoint)
}
