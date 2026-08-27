import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabAnalyzerVendor } from './types'

export const LayananLabAnalyzerOrderEndpoint = '/lab-analyzer-vendors'

export function useLabAnalyzerVendorResource() {
  return useCrudResource<LabAnalyzerVendor>(LayananLabAnalyzerOrderEndpoint)
}
