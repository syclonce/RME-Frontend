import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Applicant } from './types'

export const PendaftaranApplicantEndpoint = '/applicants'

export function useApplicantResource() {
  return useCrudResource<Applicant>(PendaftaranApplicantEndpoint)
}
