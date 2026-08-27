import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InpatientType } from './types'

export const GeneralInpatientTypeEndpoint = '/inpatient-types'

export function useInpatientTypeResource() {
  return useCrudResource<InpatientType>(GeneralInpatientTypeEndpoint)
}
