import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntimicrobialStewardshipApproval } from './types'

export const LayananAntimicrobialStewardshipApprovalEndpoint = '/antimicrobial-stewardship-approvals'

export function useAntimicrobialStewardshipApprovalResource() {
  return useCrudResource<AntimicrobialStewardshipApproval>(LayananAntimicrobialStewardshipApprovalEndpoint)
}
