import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DosageInstruction } from './types'

export const GeneralDosageInstructionEndpoint = '/dosage-instructions'

export function useDosageInstructionResource() {
  return useCrudResource<DosageInstruction>(GeneralDosageInstructionEndpoint)
}
