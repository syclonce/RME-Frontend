import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EndOfLifeEducation } from './types'

export const MedicalRecordEndOfLifeEducationEndpoint = '/end-of-life-educations'

export function useEndOfLifeEducationResource() {
  return useCrudResource<EndOfLifeEducation>(MedicalRecordEndOfLifeEducationEndpoint)
}
