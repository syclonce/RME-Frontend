import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabAnalyzerVendor, LabAnalyzerOrder } from './types'

export const LayananLabAnalyzerVendorEndpoint = '/lab-analyzer-vendors'
export const LayananLabAnalyzerOrderEndpoint = '/lab-analyzer-orders'

export function useLabAnalyzerVendorResource() {
  return useCrudResource<LabAnalyzerVendor>(LayananLabAnalyzerVendorEndpoint)
}

export function useLabAnalyzerOrderResource() {
  return useCrudResource<LabAnalyzerOrder>(LayananLabAnalyzerOrderEndpoint)
}
