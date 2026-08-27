import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntimicrobialStewardshipGeneralExamination } from './types'

export const LayananAntimicrobialStewardshipGeneralExaminationEndpoint = '/antimicrobial-stewardship-general-examinations'

export function useAntimicrobialStewardshipGeneralExaminationResource() {
  return useCrudResource<AntimicrobialStewardshipGeneralExamination>(LayananAntimicrobialStewardshipGeneralExaminationEndpoint)
}
