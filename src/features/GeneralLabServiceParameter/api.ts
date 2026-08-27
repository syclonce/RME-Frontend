import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabServiceParameter } from './types'

export const GeneralLabServiceParameterEndpoint = '/lab-service-parameters'

export function useLabServiceParameterResource() {
  return useCrudResource<LabServiceParameter>(GeneralLabServiceParameterEndpoint)
}
