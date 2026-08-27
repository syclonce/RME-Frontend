import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SitbHivTestResult } from './types'

export const GeneralSitbHivTestResultEndpoint = '/sitb-hiv-test-results'

export function useSitbHivTestResultResource() {
  return useCrudResource<SitbHivTestResult>(GeneralSitbHivTestResultEndpoint)
}
