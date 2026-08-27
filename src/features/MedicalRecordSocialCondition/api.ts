import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SocialCondition } from './types'

export const MedicalRecordSocialConditionEndpoint = '/social-conditions'

export function useSocialConditionResource() {
  return useCrudResource<SocialCondition>(MedicalRecordSocialConditionEndpoint)
}
