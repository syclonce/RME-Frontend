import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Manufacturer } from './types'

export const GeneralManufacturerEndpoint = '/manufacturers'

export function useManufacturerResource() {
  return useCrudResource<Manufacturer>(GeneralManufacturerEndpoint)
}
