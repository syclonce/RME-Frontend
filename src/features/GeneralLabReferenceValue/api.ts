import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabReferenceValue } from './types'

export const GeneralLabReferenceValueEndpoint = '/lab-reference-values'

export function useLabReferenceValueResource() {
  return useCrudResource<LabReferenceValue>(GeneralLabReferenceValueEndpoint)
}
