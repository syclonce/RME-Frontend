import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MixtureInstruction } from './types'

export const GeneralMixtureInstructionEndpoint = '/mixture-instructions'

export function useMixtureInstructionResource() {
  return useCrudResource<MixtureInstruction>(GeneralMixtureInstructionEndpoint)
}
