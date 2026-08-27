import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbDiagnosisType } from './types'

export const GeneralSitbDiagnosisTypeEndpoint = '/sitb-diagnosis-types'

export function useSitbDiagnosisTypeResource() {
  return useCrudResource<SitbDiagnosisType>(GeneralSitbDiagnosisTypeEndpoint)
}
