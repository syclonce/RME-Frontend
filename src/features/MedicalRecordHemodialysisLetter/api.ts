import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { HemodialysisLetter } from './types'

export const MedicalRecordHemodialysisLetterEndpoint = '/hemodialysis-letters'

export function useHemodialysisLetterResource() {
  return useCrudResource<HemodialysisLetter>(MedicalRecordHemodialysisLetterEndpoint)
}
