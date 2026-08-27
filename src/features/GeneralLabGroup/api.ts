import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabGroup } from './types'

export const GeneralLabGroupEndpoint = '/lab-groups'

export function useLabGroupResource() {
  return useCrudResource<LabGroup>(GeneralLabGroupEndpoint)
}
